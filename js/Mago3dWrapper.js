
class Mago3dWrapper {
    constructor(initiallizeCallbackFunction) {
        this._readyToUse = false;
        this.mago3dInstance;
        
        if(initiallizeCallbackFunction && typeof initiallizeCallbackFunction === 'function') {
            this.initiallizeCallbackFunction = initiallizeCallbackFunction;
        }
    }

    get readyToUse() {
        return this._readyToUse;
    }
    set readyToUse(ready) {
        this._readyToUse = ready;
    }

    start() {
        fetch('./static/geopolicy.json')
        .then(response => response.json())
        .then(geopolicy => {
            const self = this;
            new Mago3D.Mago3d('magoContainer', geopolicy, {
                loadend(instance) {
                    self.readyToUse = true;
                    self.mago3dInstance = instance;
                    instance.setBaseUrl('./static/f4d')
                    if(self.initiallizeCallbackFunction) self.initiallizeCallbackFunction.call(self, instance);
                }
            });
        });
    }
    initStaticModel(param) {
        const {projectId, projectFolderName, buildingFolderName,
            instanceId, longitude, latitude, height} = param;

        const magoManager = this.mago3dInstance.getMagoManager();
        magoManager.addStaticModel({
            projectId,
            projectFolderName,
            buildingFolderName
        });
        magoManager.instantiateStaticModel({
            projectId,
            instanceId,
            longitude,
            latitude,
            height
        });
    }

    getF4dModel(projectId, instanceId) {
        const magoManager = this.mago3dInstance.getMagoManager();
        const hierarchyManager = magoManager?.hierarchyManager;

        if(!hierarchyManager) return;

        return hierarchyManager.getNodeByDataKey(projectId, instanceId);
    }
    createGuid() {
        return Mago3D.createGuid();
    }

    getInterpolatedPoints(start, end, offset) {
        return Mago3D.GeographicCoordSegment.getArcInterpolatedGeoCoords(new Mago3D.GeographicCoord(start[0], start[1], 0), 
                    new Mago3D.GeographicCoord(end[0], end[1], 0), offset);
    }

    getTerrainProvider() {
        return this.mago3dInstance.getViewer().terrainProvider;
    }
    drive(param) {
        const {projectId, instanceId, path} = param;

        const magoManager = this.mago3dInstance.getMagoManager();

        magoManager.once(Mago3D.MagoManager.EVENT_TYPE.ANIMATIONEND, (e)=>{
            magoManager.sceneState.camera.stopTrack(magoManager);
        });

        const animationType = Mago3D.CODE.animationType.PATH;
        //속도, 사람 자전거 차량에 따라 변경해주면 될듯. 
        let linearVelocityInMetersSecond = 100;
        let autoChangeRotation = true;

        let animationOption = {
            animationType,
            path,
            linearVelocityInMetersSecond,
            autoChangeRotation
        };

        magoManager.changeLocationAndRotation(projectId, 
            instanceId, undefined, undefined, undefined, undefined, undefined, undefined, 
            animationOption);

        let node = this.getF4dModel(projectId, instanceId);

        //카메라 추적 시 위치. 값을 변경해주세요. 20211024
        let type = Mago3D.CODE.trackMode.TRACKING;
        let targetOffset = 100;
        let trackCameraOffsetY = -100;
        let trackCameraOffsetZ = 50;

        //드라이빙시킨 차량을 카메라가 추적
        let trackOption = {
            type,
            targetOffset,
            trackCameraOffset : {
                y: trackCameraOffsetY,
                z: trackCameraOffsetZ
            }
        }
        magoManager.sceneState.camera.setTrack(node, trackOption);
    }

    flight(param) {
        const {projectId, instanceId, path} = param;

        const magoManager = this.mago3dInstance.getMagoManager();

        magoManager.once(Mago3D.MagoManager.EVENT_TYPE.ANIMATIONEND, (e)=>{
            magoManager.sceneState.camera.stopTrack(magoManager);
        });

        const animationType = Mago3D.CODE.animationType.PATH;
        //속도, 사람 자전거 차량에 따라 변경해주면 될듯. 
        let linearVelocityInMetersSecond = 10000;
        let autoChangeRotation = true;

        let animationOption = {
            animationType,
            path,
            linearVelocityInMetersSecond,
            autoChangeRotation
        };

        magoManager.changeLocationAndRotation(projectId, 
            instanceId, undefined, undefined, undefined, undefined, undefined, undefined, 
            animationOption);

        let node = this.getF4dModel(projectId, instanceId);

        //카메라 추적 시 위치. 값을 변경해주세요. 20211024
        let type = Mago3D.CODE.trackMode.DRIVER;
        let targetOffset = 100;
        let trackCameraOffsetY = -100;
        let trackCameraOffsetZ = 50;

        //드라이빙시킨 차량을 카메라가 추적
        let trackOption = {
            type,
            targetOffset,
            trackCameraOffset : {
                y: trackCameraOffsetY,
                z: trackCameraOffsetZ
            }
        }
        magoManager.sceneState.camera.setTrack(node, trackOption);
    }
}
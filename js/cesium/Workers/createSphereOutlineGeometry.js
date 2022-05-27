define(["./when-229515d6","./Matrix2-f2da41d4","./RuntimeError-ffe03243","./EllipsoidOutlineGeometry-cc53e7d9","./ComponentDatatype-17b06483","./WebGLConstants-4e26b85a","./GeometryOffsetAttribute-ff1e192c","./Transforms-9cbc873c","./combine-8ce3f24b","./GeometryAttribute-a2983cc1","./GeometryAttributes-b253752a","./IndexDatatype-b10faa0b"],(function(e,i,t,r,n,o,s,a,d,l,c,u){"use strict";function m(t){var n=e.defaultValue(t.radius,1),o={radii:new i.Cartesian3(n,n,n),stackPartitions:t.stackPartitions,slicePartitions:t.slicePartitions,subdivisions:t.subdivisions};this._ellipsoidGeometry=new r.EllipsoidOutlineGeometry(o),this._workerName="createSphereOutlineGeometry"}m.packedLength=r.EllipsoidOutlineGeometry.packedLength,m.pack=function(e,i,t){return r.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,i,t)};var p=new r.EllipsoidOutlineGeometry,y={radius:void 0,radii:new i.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};return m.unpack=function(t,n,o){var s=r.EllipsoidOutlineGeometry.unpack(t,n,p);return y.stackPartitions=s._stackPartitions,y.slicePartitions=s._slicePartitions,y.subdivisions=s._subdivisions,e.defined(o)?(i.Cartesian3.clone(s._radii,y.radii),o._ellipsoidGeometry=new r.EllipsoidOutlineGeometry(y),o):(y.radius=s._radii.x,new m(y))},m.createGeometry=function(e){return r.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},function(i,t){return e.defined(t)&&(i=m.unpack(i,t)),m.createGeometry(i)}}));
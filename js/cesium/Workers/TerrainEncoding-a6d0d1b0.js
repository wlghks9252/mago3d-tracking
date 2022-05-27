define(["exports","./Transforms-e254a706","./Matrix2-b06ef836","./RuntimeError-ffe03243","./when-229515d6","./AttributeCompression-0d03c199","./ComponentDatatype-dc3af6a4"],(function(e,t,i,a,r,o,n){"use strict";function s(e,t){a.Check.typeOf.object("ellipsoid",e),this._ellipsoid=e,this._cameraPosition=new i.Cartesian3,this._cameraPositionInScaledSpace=new i.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,r.defined(t)&&(this.cameraPosition=t)}Object.defineProperties(s.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(e){var t=this._ellipsoid.transformPositionToScaledSpace(e,this._cameraPositionInScaledSpace),a=i.Cartesian3.magnitudeSquared(t)-1;i.Cartesian3.clone(e,this._cameraPosition),this._cameraPositionInScaledSpace=t,this._distanceToLimbInScaledSpaceSquared=a}}});var c=new i.Cartesian3;s.prototype.isPointVisible=function(e){return C(this._ellipsoid.transformPositionToScaledSpace(e,c),this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)},s.prototype.isScaledSpacePointVisible=function(e){return C(e,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};var d=new i.Cartesian3;s.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(e,t){var i,a,o=this._ellipsoid;return r.defined(t)&&t<0&&o.minimumRadius>-t?((a=d).x=this._cameraPosition.x/(o.radii.x+t),a.y=this._cameraPosition.y/(o.radii.y+t),a.z=this._cameraPosition.z/(o.radii.z+t),i=a.x*a.x+a.y*a.y+a.z*a.z-1):(a=this._cameraPositionInScaledSpace,i=this._distanceToLimbInScaledSpaceSquared),C(e,a,i)},s.prototype.computeHorizonCullingPoint=function(e,t,i){return f(this._ellipsoid,e,t,i)};var u=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE);s.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(e,t,i,a){return f(h(this._ellipsoid,i,u),e,t,a)},s.prototype.computeHorizonCullingPointFromVertices=function(e,t,i,a,r){return x(this._ellipsoid,e,t,i,a,r)},s.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(e,t,i,a,r,o){return x(h(this._ellipsoid,r,u),e,t,i,a,o)};var m=[];s.prototype.computeHorizonCullingPointFromRectangle=function(e,r,o){a.Check.typeOf.object("rectangle",e);var n=i.Rectangle.subsample(e,r,0,m),s=t.BoundingSphere.fromPoints(n);if(!(i.Cartesian3.magnitude(s.center)<.1*r.minimumRadius))return this.computeHorizonCullingPoint(s.center,n,o)};var l=new i.Cartesian3;function h(e,t,a){if(r.defined(t)&&t<0&&e.minimumRadius>-t){var o=i.Cartesian3.fromElements(e.radii.x+t,e.radii.y+t,e.radii.z+t,l);e=i.Ellipsoid.fromCartesian3(o,a)}return e}function f(e,t,o,n){a.Check.typeOf.object("directionToPoint",t),a.Check.defined("positions",o),r.defined(n)||(n=new i.Cartesian3);for(var s=T(e,t),c=0,d=0,u=o.length;d<u;++d){var m=y(e,o[d],s);if(m<0)return;c=Math.max(c,m)}return v(s,c,n)}var p=new i.Cartesian3;function x(e,t,o,n,s,c){a.Check.typeOf.object("directionToPoint",t),a.Check.defined("vertices",o),a.Check.typeOf.number("stride",n),r.defined(c)||(c=new i.Cartesian3),n=r.defaultValue(n,3),s=r.defaultValue(s,i.Cartesian3.ZERO);for(var d=T(e,t),u=0,m=0,l=o.length;m<l;m+=n){p.x=o[m]+s.x,p.y=o[m+1]+s.y,p.z=o[m+2]+s.z;var h=y(e,p,d);if(h<0)return;u=Math.max(u,h)}return v(d,u,c)}function C(e,t,a){var r=t,o=a,n=i.Cartesian3.subtract(e,r,c),s=-i.Cartesian3.dot(n,r);return!(o<0?s>0:s>o&&s*s/i.Cartesian3.magnitudeSquared(n)>o)}var S=new i.Cartesian3,g=new i.Cartesian3;function y(e,t,a){var r=e.transformPositionToScaledSpace(t,S),o=i.Cartesian3.magnitudeSquared(r),n=Math.sqrt(o),s=i.Cartesian3.divideByScalar(r,n,g);o=Math.max(1,o);var c=1/(n=Math.max(1,n));return 1/(i.Cartesian3.dot(s,a)*c-i.Cartesian3.magnitude(i.Cartesian3.cross(s,a,s))*(Math.sqrt(o-1)*c))}function v(e,t,a){if(!(t<=0||t===1/0||t!=t))return i.Cartesian3.multiplyByScalar(e,t,a)}var N=new i.Cartesian3;function T(e,t){return i.Cartesian3.equals(t,i.Cartesian3.ZERO)?t:(e.transformPositionToScaledSpace(t,N),i.Cartesian3.normalize(N,N))}var b={getHeight:function(e,t,i){return(e-i)*t+i}},M=new i.Cartesian3;b.getPosition=function(e,t,a,r,o){var n=t.cartesianToCartographic(e,M),s=b.getHeight(n.height,a,r);return i.Cartesian3.fromRadians(n.longitude,n.latitude,s,t,o)};var P=Object.freeze({NONE:0,BITS12:1}),z=new i.Cartesian3,_=new i.Cartesian3,E=new i.Cartesian2,H=new i.Matrix4,w=new i.Matrix4,A=Math.pow(2,12);function I(e,t,a,o,n,s,c,d,u,m){var l,h,f=P.NONE;if(r.defined(t)&&r.defined(a)&&r.defined(o)&&r.defined(n)){var p=t.minimum,x=t.maximum,C=i.Cartesian3.subtract(x,p,_),S=o-a;f=Math.max(i.Cartesian3.maximumComponent(C),S)<A-1?P.BITS12:P.NONE,l=i.Matrix4.inverseTransformation(n,new i.Matrix4);var g=i.Cartesian3.negate(p,z);i.Matrix4.multiply(i.Matrix4.fromTranslation(g,H),l,l);var y=z;y.x=1/C.x,y.y=1/C.y,y.z=1/C.z,i.Matrix4.multiply(i.Matrix4.fromScale(y,H),l,l),h=i.Matrix4.clone(n),i.Matrix4.setTranslation(h,i.Cartesian3.ZERO,h),n=i.Matrix4.clone(n,new i.Matrix4);var v=i.Matrix4.fromTranslation(p,H),N=i.Matrix4.fromScale(C,w),T=i.Matrix4.multiply(v,N,H);i.Matrix4.multiply(n,T,n),i.Matrix4.multiply(h,T,h)}this.quantization=f,this.minimumHeight=a,this.maximumHeight=o,this.center=i.Cartesian3.clone(e),this.toScaledENU=l,this.fromScaledENU=n,this.matrix=h,this.hasVertexNormals=s,this.hasWebMercatorT=r.defaultValue(c,!1),this.hasGeodeticSurfaceNormals=r.defaultValue(d,!1),this.exaggeration=r.defaultValue(u,1),this.exaggerationRelativeHeight=r.defaultValue(m,0),this.stride=0,this._offsetGeodeticSurfaceNormal=0,this._offsetVertexNormal=0,this._calculateStrideAndOffsets()}I.prototype.encode=function(e,t,a,r,s,c,d,u){var m=r.x,l=r.y;if(this.quantization===P.BITS12){(a=i.Matrix4.multiplyByPoint(this.toScaledENU,a,z)).x=n.CesiumMath.clamp(a.x,0,1),a.y=n.CesiumMath.clamp(a.y,0,1),a.z=n.CesiumMath.clamp(a.z,0,1);var h=this.maximumHeight-this.minimumHeight,f=n.CesiumMath.clamp((s-this.minimumHeight)/h,0,1);i.Cartesian2.fromElements(a.x,a.y,E);var p=o.AttributeCompression.compressTextureCoordinates(E);i.Cartesian2.fromElements(a.z,f,E);var x=o.AttributeCompression.compressTextureCoordinates(E);i.Cartesian2.fromElements(m,l,E);var C=o.AttributeCompression.compressTextureCoordinates(E);if(e[t++]=p,e[t++]=x,e[t++]=C,this.hasWebMercatorT){i.Cartesian2.fromElements(d,0,E);var S=o.AttributeCompression.compressTextureCoordinates(E);e[t++]=S}}else i.Cartesian3.subtract(a,this.center,z),e[t++]=z.x,e[t++]=z.y,e[t++]=z.z,e[t++]=s,e[t++]=m,e[t++]=l,this.hasWebMercatorT&&(e[t++]=d);return this.hasVertexNormals&&(e[t++]=o.AttributeCompression.octPackFloat(c)),this.hasGeodeticSurfaceNormals&&(e[t++]=u.x,e[t++]=u.y,e[t++]=u.z),t};var O=new i.Cartesian3,q=new i.Cartesian3;I.prototype.addGeodeticSurfaceNormals=function(e,t,i){if(!this.hasGeodeticSurfaceNormals){var a=this.stride,r=e.length/a;this.hasGeodeticSurfaceNormals=!0,this._calculateStrideAndOffsets();for(var o=this.stride,n=0;n<r;n++){for(var s=0;s<a;s++){var c=n*a+s;t[n*o+s]=e[c]}var d=this.decodePosition(t,n,O),u=i.geodeticSurfaceNormal(d,q),m=n*o+this._offsetGeodeticSurfaceNormal;t[m]=u.x,t[m+1]=u.y,t[m+2]=u.z}}},I.prototype.removeGeodeticSurfaceNormals=function(e,t){if(this.hasGeodeticSurfaceNormals){var i=this.stride,a=e.length/i;this.hasGeodeticSurfaceNormals=!1,this._calculateStrideAndOffsets();for(var r=this.stride,o=0;o<a;o++)for(var n=0;n<r;n++){var s=o*i+n;t[o*r+n]=e[s]}}},I.prototype.decodePosition=function(e,t,a){if(r.defined(a)||(a=new i.Cartesian3),t*=this.stride,this.quantization===P.BITS12){var n=o.AttributeCompression.decompressTextureCoordinates(e[t],E);a.x=n.x,a.y=n.y;var s=o.AttributeCompression.decompressTextureCoordinates(e[t+1],E);return a.z=s.x,i.Matrix4.multiplyByPoint(this.fromScaledENU,a,a)}return a.x=e[t],a.y=e[t+1],a.z=e[t+2],i.Cartesian3.add(a,this.center,a)},I.prototype.getExaggeratedPosition=function(e,t,i){i=this.decodePosition(e,t,i);var a=this.exaggeration,r=this.exaggerationRelativeHeight;if(1!==a&&this.hasGeodeticSurfaceNormals){var o=this.decodeGeodeticSurfaceNormal(e,t,q),n=this.decodeHeight(e,t),s=b.getHeight(n,a,r)-n;i.x+=o.x*s,i.y+=o.y*s,i.z+=o.z*s}return i},I.prototype.decodeTextureCoordinates=function(e,t,a){return r.defined(a)||(a=new i.Cartesian2),t*=this.stride,this.quantization===P.BITS12?o.AttributeCompression.decompressTextureCoordinates(e[t+2],a):i.Cartesian2.fromElements(e[t+4],e[t+5],a)},I.prototype.decodeHeight=function(e,t){return t*=this.stride,this.quantization===P.BITS12?o.AttributeCompression.decompressTextureCoordinates(e[t+1],E).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight:e[t+3]},I.prototype.decodeWebMercatorT=function(e,t){return t*=this.stride,this.quantization===P.BITS12?o.AttributeCompression.decompressTextureCoordinates(e[t+3],E).x:e[t+6]},I.prototype.getOctEncodedNormal=function(e,t,a){var r=e[t=t*this.stride+this._offsetVertexNormal]/256,o=Math.floor(r),n=256*(r-o);return i.Cartesian2.fromElements(o,n,a)},I.prototype.decodeGeodeticSurfaceNormal=function(e,t,i){return t=t*this.stride+this._offsetGeodeticSurfaceNormal,i.x=e[t],i.y=e[t+1],i.z=e[t+2],i},I.prototype._calculateStrideAndOffsets=function(){var e=0;if(this.quantization===P.BITS12)e+=3;else e+=6;this.hasWebMercatorT&&(e+=1),this.hasVertexNormals&&(this._offsetVertexNormal=e,e+=1),this.hasGeodeticSurfaceNormals&&(this._offsetGeodeticSurfaceNormal=e,e+=3),this.stride=e};var V={position3DAndHeight:0,textureCoordAndEncodedNormals:1,geodeticSurfaceNormal:2},G={compressed0:0,compressed1:1,geodeticSurfaceNormal:2};I.prototype.getAttributes=function(e){var t=n.ComponentDatatype.FLOAT,i=n.ComponentDatatype.getSizeInBytes(t),a=this.stride*i,r=0,o=[];function s(n,s){o.push({index:n,vertexBuffer:e,componentDatatype:t,componentsPerAttribute:s,offsetInBytes:r,strideInBytes:a}),r+=s*i}if(this.quantization===P.NONE){s(V.position3DAndHeight,4);var c=2;c+=this.hasWebMercatorT?1:0,c+=this.hasVertexNormals?1:0,s(V.textureCoordAndEncodedNormals,c),this.hasGeodeticSurfaceNormals&&s(V.geodeticSurfaceNormal,3)}else{var d=this.hasWebMercatorT||this.hasVertexNormals,u=this.hasWebMercatorT&&this.hasVertexNormals;s(G.compressed0,d?4:3),u&&s(G.compressed1,1),this.hasGeodeticSurfaceNormals&&s(G.geodeticSurfaceNormal,3)}return o},I.prototype.getAttributeLocations=function(){return this.quantization===P.NONE?V:G},I.clone=function(e,t){if(r.defined(e))return r.defined(t)||(t=new I),t.quantization=e.quantization,t.minimumHeight=e.minimumHeight,t.maximumHeight=e.maximumHeight,t.center=i.Cartesian3.clone(e.center),t.toScaledENU=i.Matrix4.clone(e.toScaledENU),t.fromScaledENU=i.Matrix4.clone(e.fromScaledENU),t.matrix=i.Matrix4.clone(e.matrix),t.hasVertexNormals=e.hasVertexNormals,t.hasWebMercatorT=e.hasWebMercatorT,t.hasGeodeticSurfaceNormals=e.hasGeodeticSurfaceNormals,t.exaggeration=e.exaggeration,t.exaggerationRelativeHeight=e.exaggerationRelativeHeight,t._calculateStrideAndOffsets(),t},e.EllipsoidalOccluder=s,e.TerrainEncoding=I}));
//# sourceMappingURL=TerrainEncoding-a6d0d1b0.js.map

define(["exports","./when-229515d6","./RuntimeError-ffe03243","./Matrix2-b06ef836"],(function(e,t,i,r){"use strict";e.GeometryInstance=function(e){if(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),!t.defined(e.geometry))throw new i.DeveloperError("options.geometry is required.");this.geometry=e.geometry,this.modelMatrix=r.Matrix4.clone(t.defaultValue(e.modelMatrix,r.Matrix4.IDENTITY)),this.id=e.id,this.pickPrimitive=e.pickPrimitive,this.attributes=t.defaultValue(e.attributes,{}),this.westHemisphereGeometry=void 0,this.eastHemisphereGeometry=void 0}}));
//# sourceMappingURL=GeometryInstance-859d322e.js.map
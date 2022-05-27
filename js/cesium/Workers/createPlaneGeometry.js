define(["./when-229515d6","./Transforms-9cbc873c","./Matrix2-f2da41d4","./RuntimeError-ffe03243","./ComponentDatatype-17b06483","./GeometryAttribute-a2983cc1","./GeometryAttributes-b253752a","./VertexFormat-565d6a6c","./combine-8ce3f24b","./WebGLConstants-4e26b85a"],(function(e,t,r,a,n,o,i,m,u,p){"use strict";function c(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var r=e.defaultValue(t.vertexFormat,m.VertexFormat.DEFAULT);this._vertexFormat=r,this._workerName="createPlaneGeometry"}c.packedLength=m.VertexFormat.packedLength,c.pack=function(t,r,a){return a=e.defaultValue(a,0),m.VertexFormat.pack(t._vertexFormat,r,a),r};var y=new m.VertexFormat,s={vertexFormat:y};c.unpack=function(t,r,a){r=e.defaultValue(r,0);var n=m.VertexFormat.unpack(t,r,y);return e.defined(a)?(a._vertexFormat=m.VertexFormat.clone(n,a._vertexFormat),a):new c(s)};var A=new r.Cartesian3(-.5,-.5,0),b=new r.Cartesian3(.5,.5,0);return c.createGeometry=function(e){var a,m,u=e._vertexFormat,p=new i.GeometryAttributes;if(u.position){if((m=new Float64Array(12))[0]=A.x,m[1]=A.y,m[2]=0,m[3]=b.x,m[4]=A.y,m[5]=0,m[6]=b.x,m[7]=b.y,m[8]=0,m[9]=A.x,m[10]=b.y,m[11]=0,p.position=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m}),u.normal){var c=new Float32Array(12);c[0]=0,c[1]=0,c[2]=1,c[3]=0,c[4]=0,c[5]=1,c[6]=0,c[7]=0,c[8]=1,c[9]=0,c[10]=0,c[11]=1,p.normal=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:c})}if(u.st){var y=new Float32Array(8);y[0]=0,y[1]=0,y[2]=1,y[3]=0,y[4]=1,y[5]=1,y[6]=0,y[7]=1,p.st=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:y})}if(u.tangent){var s=new Float32Array(12);s[0]=1,s[1]=0,s[2]=0,s[3]=1,s[4]=0,s[5]=0,s[6]=1,s[7]=0,s[8]=0,s[9]=1,s[10]=0,s[11]=0,p.tangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:s})}if(u.bitangent){var f=new Float32Array(12);f[0]=0,f[1]=1,f[2]=0,f[3]=0,f[4]=1,f[5]=0,f[6]=0,f[7]=1,f[8]=0,f[9]=0,f[10]=1,f[11]=0,p.bitangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})}(a=new Uint16Array(6))[0]=0,a[1]=1,a[2]=2,a[3]=0,a[4]=2,a[5]=3}return new o.Geometry({attributes:p,indices:a,primitiveType:o.PrimitiveType.TRIANGLES,boundingSphere:new t.BoundingSphere(r.Cartesian3.ZERO,Math.sqrt(2))})},function(t,r){return e.defined(r)&&(t=c.unpack(t,r)),c.createGeometry(t)}}));
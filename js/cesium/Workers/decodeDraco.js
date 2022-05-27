define(["./ComponentDatatype-17b06483","./when-229515d6","./IndexDatatype-b10faa0b","./RuntimeError-ffe03243","./createTaskProcessorWorker","./WebGLConstants-4e26b85a"],(function(e,r,t,n,a,o){"use strict";var i;function u(e,r){for(var n=e.num_points(),a=e.num_faces(),o=new i.DracoInt32Array,u=3*a,s=t.IndexDatatype.createTypedArray(n,u),d=0,c=0;c<a;++c)r.GetFaceFromMesh(e,c,o),s[d+0]=o.GetValue(0),s[d+1]=o.GetValue(1),s[d+2]=o.GetValue(2),d+=3;return i.destroy(o),{typedArray:s,numberOfIndices:u}}function s(t,n,a){var o,u=t.num_points(),s=a.num_components(),d=new i.AttributeQuantizationTransform;if(d.InitFromAttribute(a)){for(var c=new Array(s),y=0;y<s;++y)c[y]=d.min_value(y);o={quantizationBits:d.quantization_bits(),minValues:c,range:d.range(),octEncoded:!1}}i.destroy(d),(d=new i.AttributeOctahedronTransform).InitFromAttribute(a)&&(o={quantizationBits:d.quantization_bits(),octEncoded:!0}),i.destroy(d);var f,A=u*s;f=r.defined(o)?function(e,r,t,n,a){var o,u;n.quantizationBits<=8?(u=new i.DracoUInt8Array,o=new Uint8Array(a),r.GetAttributeUInt8ForAllPoints(e,t,u)):(u=new i.DracoUInt16Array,o=new Uint16Array(a),r.GetAttributeUInt16ForAllPoints(e,t,u));for(var s=0;s<a;++s)o[s]=u.GetValue(s);return i.destroy(u),o}(t,n,a,o,A):function(e,r,t,n){var a,o;switch(t.data_type()){case 1:case 11:o=new i.DracoInt8Array,a=new Int8Array(n),r.GetAttributeInt8ForAllPoints(e,t,o);break;case 2:o=new i.DracoUInt8Array,a=new Uint8Array(n),r.GetAttributeUInt8ForAllPoints(e,t,o);break;case 3:o=new i.DracoInt16Array,a=new Int16Array(n),r.GetAttributeInt16ForAllPoints(e,t,o);break;case 4:o=new i.DracoUInt16Array,a=new Uint16Array(n),r.GetAttributeUInt16ForAllPoints(e,t,o);break;case 5:case 7:o=new i.DracoInt32Array,a=new Int32Array(n),r.GetAttributeInt32ForAllPoints(e,t,o);break;case 6:case 8:o=new i.DracoUInt32Array,a=new Uint32Array(n),r.GetAttributeUInt32ForAllPoints(e,t,o);break;case 9:case 10:o=new i.DracoFloat32Array,a=new Float32Array(n),r.GetAttributeFloatForAllPoints(e,t,o)}for(var u=0;u<n;++u)a[u]=o.GetValue(u);return i.destroy(o),a}(t,n,a,A);var b=e.ComponentDatatype.fromTypedArray(f);return{array:f,data:{componentsPerAttribute:s,componentDatatype:b,byteOffset:a.byte_offset(),byteStride:e.ComponentDatatype.getSizeInBytes(b)*s,normalized:a.normalized(),quantization:o}}}function d(e){return r.defined(e.bufferView)?function(e){var r=new i.Decoder,t=e.bufferView,a=new i.DecoderBuffer;if(a.Init(e.array,t.byteLength),r.GetEncodedGeometryType(a)!==i.TRIANGULAR_MESH)throw new n.RuntimeError("Unsupported draco mesh geometry type.");var o=new i.Mesh,d=r.DecodeBufferToMesh(a,o);if(!d.ok()||0===o.ptr)throw new n.RuntimeError("Error decoding draco mesh geometry: "+d.error_msg());i.destroy(a);var c={},y=e.compressedAttributes;for(var f in y)if(y.hasOwnProperty(f)){var A=y[f],b=r.GetAttributeByUniqueId(o,A);c[f]=s(o,r,b)}var w={indexArray:u(o,r),attributeData:c};return i.destroy(o),i.destroy(r),w}(e):function(e){var r=new i.Decoder;e.dequantizeInShader&&(r.SkipAttributeTransform(i.POSITION),r.SkipAttributeTransform(i.NORMAL));var t=new i.DecoderBuffer;if(t.Init(e.buffer,e.buffer.length),r.GetEncodedGeometryType(t)!==i.POINT_CLOUD)throw new n.RuntimeError("Draco geometry type must be POINT_CLOUD.");var a=new i.PointCloud,o=r.DecodeBufferToPointCloud(t,a);if(!o.ok()||0===a.ptr)throw new n.RuntimeError("Error decoding draco point cloud: "+o.error_msg());i.destroy(t);var u={},d=e.properties;for(var c in d)if(d.hasOwnProperty(c)){var y=d[c],f=r.GetAttributeByUniqueId(a,y);u[c]=s(a,r,f)}return i.destroy(a),i.destroy(r),u}(e)}function c(e){i=e,self.onmessage=a(d),self.postMessage(!0)}return function(e){var t=e.data.webAssemblyConfig;if(r.defined(t))return require([t.modulePath],(function(e){r.defined(t.wasmBinaryFile)?(r.defined(e)||(e=self.DracoDecoderModule),e(t).then((function(e){c(e)}))):c(e())}))}}));
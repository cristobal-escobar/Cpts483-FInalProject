
const VERTEX_STRIDE = 32;

class Material
{
    constructor() {
        this.name = "";
        // this.ambient = [0.25, 0.25, 0.25];
        // this.diffuse = [1.0, 1.0, 1.0];
        // this.specular = [2.0, 2.0, 2.0];
        // this.shininess = 32.0;
        this.diffuse_map = null;
        this.specular_map = null;
    }
}

class Mesh {
    /** 
     * Creates a new mesh and loads it into video memory.
     * 
     * @param {WebGLRenderingContext} gl  
     * @param {number} program
     * @param {number[]} vertices
     * @param {number[]} indices
    */
    constructor( gl, program, vertices, indices, position) {
        this.verts = create_and_load_vertex_buffer( gl, vertices, gl.STATIC_DRAW );
        this.indis = create_and_load_elements_buffer( gl, indices, gl.STATIC_DRAW );

        this.n_verts = vertices.length;
        this.n_indis = indices.length;
        this.program = program;
        this.material = null;
        this.position = position;
        // this.update = false;
    }

    /**
     * Create a box mesh with the given dimensions and colors.
     * @param {WebGLRenderingContext} gl 
     * @param {number} width 
     * @param {number} height 
     * @param {number} depth 
     */

    static box( gl, program, width, height, depth ) {
        let hwidth = width / 2.0;
        let hheight = height / 2.0;
        let hdepth = depth / 2.0;

        let verts = [
            
            // Front
            hwidth, -hheight, -hdepth,      1.0, 0.0, 0.0, 1.0,    0.25, 0.5,
            -hwidth, -hheight, -hdepth,     0.0, 1.0, 0.0, 1.0,    0, 0.5,
            -hwidth, hheight, -hdepth,      0.0, 0.0, 1.0, 1.0,    0, 0.25,
            hwidth, hheight, -hdepth,       1.0, 1.0, 0.0, 1.0,    0.25, 0.25,

            // Back
            hwidth, -hheight, hdepth,       1.0, 0.0, 1.0, 1.0,    0.5, 0.5,
            -hwidth, -hheight, hdepth,      0.0, 1.0, 1.0, 1.0,    0.75, 0.5,
            -hwidth, hheight, hdepth,       0.5, 0.5, 1.0, 1.0,    0.75, 0.25, 
            hwidth, hheight, hdepth,        1.0, 1.0, 0.5, 1.0,    0.5, 0.25, 
            
            // Left
            -hwidth, -hheight, -hdepth,     1.0, 0.0, 0.0, 1.0,     1, 0.5,
            -hwidth, -hheight, hdepth,      0.0, 1.0, 0.0, 1.0,     0.75, 0.5,
            -hwidth, hheight, hdepth,       0.0, 0.0, 1.0, 1.0,     0.75, 0.25,
            -hwidth, hheight, -hdepth,      1.0, 1.0, 0.0, 1.0,     1, 0.25,

            // Right
            hwidth, -hheight, hdepth,       1.0, 0.0, 1.0, 1.0,     0.5, 0.5,
            hwidth, -hheight, -hdepth,      0.0, 1.0, 1.0, 1.0,     0.25, 0.5,
            hwidth, hheight, -hdepth,       0.5, 0.5, 1.0, 1.0,     0.25, 0.25,
            hwidth, hheight, hdepth,        1.0, 1.0, 0.5, 1.0,     0.5, 0.25,          
            
            // Top 
            hwidth, hheight, -hdepth,       1.0, 0.0, 0.0, 1.0,     0.75, 0,
            -hwidth, hheight, -hdepth,      0.0, 1.0, 0.0, 1.0,     0.5, 0,
            -hwidth, hheight, hdepth,       0.0, 0.0, 1.0, 1.0,     0.5, 0.25,
            hwidth, hheight, hdepth,        1.0, 1.0, 0.0, 1.0,     0.75, 0.25,

            // Bottom 
            hwidth, -hheight, hdepth,       1.0, 0.0, 1.0, 1.0,     0.75, 0.5,
            -hwidth, -hheight, hdepth,      0.0, 1.0, 1.0, 1.0,     0.5, 0.5,
            -hwidth, -hheight, -hdepth,     0.5, 0.5, 1.0, 1.0,     0.5, 0.75,
            hwidth, -hheight, -hdepth,      1.0, 1.0, 0.5, 1.0,     0.75, 0.75,

        ];

        let indis = [
            // clockwise winding
            /*
            0, 1, 2, 2, 3, 0, 
            4, 0, 3, 3, 7, 4, 
            5, 4, 7, 7, 6, 5, 
            1, 5, 6, 6, 2, 1,
            3, 2, 6, 6, 7, 3,
            4, 5, 1, 1, 0, 4,
            */

            // counter-clockwise winding
            // 0, 3, 2, 2, 1, 0,
            // 4, 7, 3, 3, 0, 4,
            // 5, 6, 7, 7, 4, 5,
            // 1, 2, 6, 6, 5, 1,
            // 3, 7, 6, 6, 2, 3,
            // 4, 0, 1, 1, 5, 4,

            0, 3, 2, 2, 1, 0,
            5, 6, 7, 7, 4, 5,
            10, 9, 8, 8, 11, 10,
            12, 15, 14, 14, 13, 12,
            19, 18, 17, 17, 16, 19,
            20, 23, 22, 22, 21, 20,

        ];

        return new Mesh( gl, program, verts, indis );
    }


    /**
     * Render the mesh. Does NOT preserve array/index buffer or program bindings! 
     * 
     * @param {WebGLRenderingContext} gl 
     */
    render( gl ) {
        gl.cullFace( gl.BACK );
        // gl.enable( gl.CULL_FACE );
        // gl.frontFace(gl.CCW);
        
        gl.useProgram( this.program );
        gl.bindBuffer( gl.ARRAY_BUFFER, this.verts );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indis );

        set_vertex_attrib_to_buffer( 
            gl, this.program, 
            "coordinates", 
            this.verts, 3, 
            gl.FLOAT, false, VERTEX_STRIDE, 0 
        );

        set_vertex_attrib_to_buffer( 
            gl, this.program, 
            "uv", 
            this.verts, 2, 
            gl.FLOAT, false, VERTEX_STRIDE, 12
        );

        set_vertex_attrib_to_buffer( 
            gl, this.program, 
            "normal", 
            this.verts, 3, 
            gl.FLOAT, false, VERTEX_STRIDE, 20 
        );

        gl.drawElements( gl.TRIANGLES, this.n_indis, gl.UNSIGNED_SHORT, 0 );
    }

    static load_texture(gl, url) {
        const texture = gl.createTexture();
        const image = new Image();
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);
        };

        // image.onload = function() { on_load()};
        image.src = url;
        return texture;
    }

    static from_mtl_file(gl, text, f) {
        const lines = text.split(/\r?\n/);
        let materials = [];
        let material = new Material();


        // lines.forEach(line => {
        //     const parts = line.trim().split(/\s+/);
        for( let line of lines ) {
            let trimmed = line.trim();
            let parts = trimmed.split( /(\s+)/ );
            // if (parts.length === 0 || parts[0].startsWith('#'))

            if (parts[0] == 'newmtl') // New material
            {
                if (material.name != "")
                {
                    materials.push(material);
                    material = new Material();
                }

                material.name = parts[2];

            }

            // else if (parts[0] == 'Ka')
            // {
            // // Ambient color
            //     material.ambient = [parseFloat(parts[2]), parseFloat(parts[4]), parseFloat(parts[6])];
            // }

            // else if (parts[0] == 'Kd') // Diffuse color
            // {
            //     material.diffuse = [parseFloat(parts[2]), parseFloat(parts[4]), parseFloat(parts[6])];
            // }

            // else if (parts[0] == 'Ks') // Specular color
            // {
            //     material.specular = [parseFloat(parts[2]), parseFloat(parts[4]), parseFloat(parts[6])];
            // }
            // else if (parts[0] == 'Ns') // Shininess
            // {
            //     material.shininess = parseFloat(parts[2]);
            // }

            else if (parts[0] == 'map_Kd') // Diffuse texture map
            {
                material.diffuse_map = Mesh.load_texture(gl, "/model/" + parts[2]);
            }
            else if (parts[0] == 'map_Ks') // Specular texture map
            {
                material.specular_map = Mesh.load_texture(gl, "/model/" + parts[2]);
            }
        }

        materials.push(material);

        if (material.name != "" && materials.length > 2)
        {
            f(materials);
        }
    }


    /**
     * Parse the given text as the body of an obj file.
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     * @param {string} text
     */
    static from_obj_text( gl, program, text ) {
        let lines = text.split( /\r?\n/ );

        let verts = [];
        let temp_verts = [];
        let uvs = [];
        let normals = [];
        let indis = [];
        let meshes = [];
        let position = new Vec4();

        let min_x = 100000;
        let max_x = -100000;
        let min_y = 100000;
        let max_y = -100000;
        let min_z = 100000;
        let max_z = -100000;
        

        for( let line of lines ) {
            let trimmed = line.trim();
            let parts = trimmed.split( /(\s+)/ );

            if( 
                parts === null || parts.length === 0 || 
                parts[0] == '#' || parts[0] === '' ) 
            { 
                continue; 
            }
            else if (parts[0] == 'g' && (verts.length > 0 && indis.length > 0))
            {
                position = new Vec4((max_x + min_x) / 2, (max_y + min_y) / 2, (max_z + min_z) / 2, 1);
                meshes.push(new Mesh (gl, program, verts, indis, position));
                verts = [];
                indis = [];
                position = new Vec4();

                min_x = 100000;
                max_x = -100000;
                min_y = 100000;
                max_y = -100000;
                min_z = 100000;
                max_z = -100000;

            }
            else if( parts[0] == 'v' ) {

                let x = parseFloat( parts[2]);
                let y = parseFloat( parts[4]);
                let z = parseFloat( parts[6]);

                
                
                temp_verts.push( x );
                temp_verts.push( y );
                temp_verts.push( z );
                
                // color data
                // temp_verts.push( 1, 1, 1, 1 );
                if (min_x > x)
                {
                    min_x = x;
                }
                if (max_x < x)
                {
                    max_x = x;
                }

                if (min_y > y)
                {
                    min_y = y;
                }
                if (max_y < y)
                {
                    max_y = y;
                }

                if (min_z > z)
                {
                    min_z = z;
                }
                if (max_z < z)
                {
                    max_z = z;
                }
            }
            else if( parts[0] == 'vt' ) {
                
                uvs.push( parseFloat( parts[2] ) );
                uvs.push( parseFloat( parts[4] ) );
            }
            else if( parts[0] == 'vn' ) {
                
                normals.push( parseFloat( parts[2] ) );
                normals.push( parseFloat( parts[4] ) );
                normals.push( parseFloat( parts[6] ) );
            }

            else if( parts[0] == 'f' ) {
                if (uvs.length > 0 && normals.length > 0)
                {
                    // let faces = parts.slice(1).map(part => {
                    //         let [vIdx, tIdx, nIdx] = part.split('/')});

                    let faces = parts.slice(1).filter(part => part.trim() !== "").map(part => {
                        let [vIdx, tIdx, nIdx] = part.split('/').map(idx => parseInt(idx, 10) - 1);
                        return { vIdx, tIdx, nIdx };
                    });

                    // Triangulate faces if needed (e.g., for quads)
                    for (let i = 1; i < faces.length - 1; i++) {
                        let tri = [faces[0], faces[i], faces[i + 1]];
                        for (let { vIdx, tIdx, nIdx } of tri) {
                            // Add vertex position
                            verts.push(
                                temp_verts[vIdx * 3], temp_verts[vIdx * 3 + 1], temp_verts[vIdx * 3 + 2],
                                uvs[tIdx * 2], uvs[tIdx * 2 + 1],
                                normals[nIdx * 3], normals[nIdx * 3 + 1], normals[nIdx * 3 + 2]
                            );
                            indis.push(indis.length);
                        }
                    }
                }
                else{
                    indis.push( parseInt( parts[2] ) - 1 );
                    indis.push( parseInt( parts[4] ) - 1 );
                    indis.push( parseInt( parts[6] ) - 1 );
                    verts = temp_verts;
                }
            }
            else {
                // console.log( parts) ;
                // throw new Error( 'unsupported obj command: ', parts[0], parts );
                continue;
            }
        }

        if (verts.length > 0 && indis.length > 0)
        {
            position = new Vec4((max_x + min_x) / 2, (max_y + min_y) / 2, (max_z + min_z) / 2, 1);
            meshes.push(new Mesh (gl, program, verts, indis, position));
        }
		
		//console.log( verts.slice(540, 600) )
		// console.log( indis.slice(540, 600) )
        
        return meshes;
        // return new Mesh (gl, program, verts, indis);
        // }
    }

    /**
     * Asynchronously load the obj file as a mesh.
     * @param {WebGLRenderingContext} gl
     * @param {string} file_name 
     * @param {WebGLProgram} program
     * @param {function} f the function to call and give mesh to when finished.
     */
    static from_obj_file( gl, obj_file, mtl_file, program, def_material, f ) {
        let request_obj = new XMLHttpRequest();
        let request_mtl = new XMLHttpRequest();
        let materials = null;

        request_mtl.onreadystatechange = function() {
            if (request_mtl.readyState === 4 && request_mtl.status === 200) {
                Mesh.from_mtl_file(gl, request_mtl.responseText, (parsed_materials) => {
                    materials = parsed_materials;
                    // console.log("loaded:", materials);
                });
            }
        }

        // the function that will be called when the file is being loaded
        request_obj.onreadystatechange = function() {
            // console.log( request.readyState );

            if( request_obj.readyState != 4 ) { return; }
            if( request_obj.status != 200 ) { 
                throw new Error( 'HTTP error when opening .obj file: ', request_obj.statusText ); 
            }

            // now we know the file exists and is ready
            let loaded_meshes = Mesh.from_obj_text( gl, program, request_obj.responseText );
            if (materials)
            {
                if (loaded_meshes.length === materials.length)
                {
                    for (let i = 0; i < materials.length; i++)
                    {
                        loaded_meshes[i].material = materials[i];
                    }
                }
                else if (materials.length == 1)
                {
                    for (let i = 0; i < materials.length; i++)
                    {
                        loaded_meshes[i].material = materials[0];
                    }
                }
            }
            else{
                for (let mesh of loaded_meshes)
                {
                    mesh.material = def_material;
                }
            }

            console.log( 'loaded ', obj_file );
            f( loaded_meshes );
        };

        request_mtl.open( 'GET', mtl_file ); // initialize request. 
        request_mtl.send(); 
        
        request_obj.open( 'GET', obj_file ); // initialize request. 
        request_obj.send();                   // execute request
    }
}

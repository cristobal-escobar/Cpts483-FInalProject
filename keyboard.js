class Keys {
    constructor() {
        this.keys_down = {};
    }

    static start_listening() {
        let keys = new Keys();

        addEventListener('keydown', function(ev) {
            if (typeof ev.code === 'string') {
                keys.keys_down[ev.code] = true;
            }
        });

        addEventListener('keyup', function(ev) {
            if (typeof ev.code === 'string') {
                keys.keys_down[ev.code] = false;
            }
        });

        return keys;
    }

    is_key_down(code) {
        return !!this.keys_down[code];
    }

    is_keys_up(code) {
        return !this.keys_down[code];
    }

    update(camera, car) {
        const MOVE_SPEED = 0.6;
        const ROTATE_SPEED = 0.01;

        if (this.is_key_down('KeyW')) {
            camera = camera.mul(Mat4.translation(0, 0, MOVE_SPEED));
        }
        if (this.is_key_down('KeyS')) {
            camera = camera.mul(Mat4.translation(0, 0, -MOVE_SPEED));
        }
        if (this.is_key_down('KeyA')) {
            camera = camera.mul(Mat4.translation(-MOVE_SPEED, 0, 0));
        }
        if (this.is_key_down('KeyD')) {
            camera = camera.mul(Mat4.translation(MOVE_SPEED, 0, 0));
        }
        if (this.is_key_down('Space')) {
            camera = camera.mul(Mat4.translation(0, MOVE_SPEED, 0));
        }
        if (this.is_key_down('KeyC')) {
            camera = camera.mul(Mat4.translation(0, -MOVE_SPEED, 0));
        }
        if (this.is_key_down('ArrowLeft')) {
            camera = camera.mul(Mat4.rotation_xz(-ROTATE_SPEED));
        }
        if (this.is_key_down('ArrowRight')) {
            camera = camera.mul(Mat4.rotation_xz(ROTATE_SPEED));
        }
        if (this.is_key_down('ArrowUp')) {
            camera = camera.mul(Mat4.rotation_yz(ROTATE_SPEED));
        }
        if (this.is_key_down('ArrowDown')) {
            camera = camera.mul(Mat4.rotation_yz(-ROTATE_SPEED));
        }
        if (this.is_key_down('KeyQ')) {
            camera = camera.mul(Mat4.rotation_xy(-ROTATE_SPEED));
        }
        if (this.is_key_down('KeyE')) {
            camera = camera.mul(Mat4.rotation_xy(ROTATE_SPEED));
        }
        if (this.is_key_down('KeyI')) {

            car.matrix = car.matrix.mul(Mat4.translation(0, 0, MOVE_SPEED));
            car.position = car.matrix.transform_vec(car.position);
            camera = car.matrix.mul(Mat4.translation(0, 6, -10));
            // car.position.w = 0;
            // for (let child of car.children)
            // {
            //     console.log("old pos: ", child.position);
            //     child.position = child.position.add(car.position);
            //     console.log("new pos: ", child.position);
            // }

           
        }
        if (this.is_key_down('KeyK')) {
            
            car.matrix = car.matrix.mul(Mat4.translation(0, 0, -MOVE_SPEED));
            car.position = car.matrix.transform_vec(car.position);
            camera = car.matrix.mul(Mat4.scale(1, 1, -1)).mul(Mat4.translation(0, 6, -10));

            // car.position = car.positixon.scaled(-1);

            // car.position.w = 0;
            // for (let child of car.children)
            // {
            //     console.log("old pos: ", child.position);
            //     child.position = child.position.sub(car.position);
            //     console.log("new pos: ", child.position);

            // }


        }
        if (this.is_key_down('KeyL')) {
            // car.yaw += ROTATE_SPEED;

            car.children[33].data.material.name = "Tires";
            car.children[34].data.material.name = "Tires";
            car.children[35].data.material.name = "Tires";

            car.matrix = car.matrix.mul(Mat4.rotation_xz(ROTATE_SPEED));
            camera = car.matrix.mul(Mat4.translation(0, 6, -10));


            // car.children[33].matrix = car.children[33].matrix.mul(Mat4.rotation_xz(ROTATE_SPEED));
            // car.children[34].matrix = car.children[34].matrix.mul(Mat4.rotation_xz(ROTATE_SPEED));
            // car.children[35].matrix = car.children[35].matrix.mul(Mat4.rotation_xz(ROTATE_SPEED));

            // car.children[42].matrix = car.children[42].matrix.mul(Mat4.rotation_xz(ROTATE_SPEED));
            // car.children[43].matrix = car.children[43].matrix.mul(Mat4.rotation_xz(ROTATE_SPEED));
            // car.children[44].matrix = car.children[44].matrix.mul(Mat4.rotation_xz(ROTATE_SPEED));

        }
        if (this.is_key_down('KeyJ')) {

            car.children[33].data.material.name = "Tires";
            car.children[34].data.material.name = "Tires";
            car.children[35].data.material.name = "Tires";

            car.matrix = car.matrix.mul(Mat4.rotation_xz(-ROTATE_SPEED));
            camera = car.matrix.mul(Mat4.translation(0, 6, -10));

            // car.children[33].matrix = car.children[33].matrix.mul(Mat4.rotation_xz(-ROTATE_SPEED));
            // car.children[34].matrix = car.children[34].matrix.mul(Mat4.rotation_xz(-ROTATE_SPEED));
            // car.children[35].matrix = car.children[35].matrix.mul(Mat4.rotation_xz(-ROTATE_SPEED));

            // car.children[42].matrix = car.children[42].matrix.mul(Mat4.rotation_xz(-ROTATE_SPEED));
            // car.children[43].matrix = car.children[43].matrix.mul(Mat4.rotation_xz(-ROTATE_SPEED));
            // car.children[44].matrix = car.children[44].matrix.mul(Mat4.rotation_xz(-ROTATE_SPEED));
        }
        return camera;
    }
}

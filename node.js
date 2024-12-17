class Node
{
    constructor (data)
    {
        this.position = new Vec4( 0, 0, 0, 1);
        this.scale = new Vec4(1, 1, 1, 1);
        this.roll = 0;
        this.pitch = 0;
        this.yaw = 0;
        this.data = data;
        this.children = [];
        // this.local_transformation = false;
        // this.local_matrix = this.get_matrix();
        this.matrix = this.get_matrix();

        if (data)
        {
            this.position = data.position;
        }

    } 

    add_child(data)
    {
        let child = new Node(data);
        this.children.push(child);
        return child;
    }

    remove_child(node)
    {
        let i = this.children.indexOf(node);
        if (i != -1)
        {
            this.children.splice(i, 1);
        }
    }

    get_matrix()
    {
        let matrix = new Mat4();
        matrix = matrix.mul(Mat4.translation(this.position.x, this.position.y, this.position.z));
        matrix = matrix.mul(Mat4.rotation_xz(this.yaw));
        matrix = matrix.mul(Mat4.rotation_yz(this.pitch));
        matrix = matrix.mul(Mat4.rotation_xy(this.roll));
        matrix = matrix.mul(Mat4.scale(this.scale.x, this.scale.y, this.scale.z));
        return matrix;
    }

}
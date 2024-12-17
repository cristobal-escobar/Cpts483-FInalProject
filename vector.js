
class Vec4 {

    constructor( x, y, z, w ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w ?? 0;
    }

    /**
     * Returns the vector that is this vector scaled by the given scalar.
     * @param {number} by the scalar to scale with 
     * @returns {Vec4}
     */
    scaled( by ) {
        
        // return the new vector
	let x = this.x * by;
        let y = this.y * by;
        let z = this.z * by;
	let w = this.w * by;

	return new Vec4(x, y, z, w);
    }

    /**
     * Returns the dot product between this vector and other
     * @param {Vec4} other the other vector 
     * @returns {number}
     */
    dot( other ) {
        
        // return the dot product 
	let x = this.x * other.x;
        let y = this.y * other.y;
        let z = this.z * other.z;
	let w = this.w * other.w;

	return x + y + z + w;
    }

    /**
     * Returns the length of this vector
     * @returns {number}
     */
    length() {
        
        // return the length
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    /**
     * Returns a normalized version of this vector
     * @returns {Vec4}
     */
    norm() {
        
        // return the normalized vector
	let len = this.length();
	let x = this.x / len;
        let y = this.y / len;
        let z = this.z / len;

	return new Vec4(x, y, z, 0);
    }

    /**
     * Returns the vector sum between this and other.
     * @param {Vec4} other 
     */
    add( other ) {
        
        // return the vector sum
	let x = this.x + other.x;
        let y = this.y + other.y;
        let z = this.z + other.z;
	let w = this.w + other.w;

	return new Vec4(x, y, z, w);
    }

    sub( other ) {
        return this.add( other.scaled( -1 ) );
    }

    cross( other ) {
        let x = this.y * other.z - this.z * other.y;
        let y = this.x * other.z - this.z * other.x;
        let z = this.x * other.y - this.y * other.x;

        return new Vec4( x, y, z, 0 );
    }
	
	toString() {
		return [ '[', this.x, this.y, this.z, this.w, ']' ].join( ' ' );
	}
}
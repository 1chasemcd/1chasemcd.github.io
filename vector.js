class Vector
{
  constructor(x, y, z)
  {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  length()
  {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }

  normalize()
  {

  }

  add(other)
  {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;

    return this;
  }

  sub(other)
  {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;

    return this;
  }

  mult(a)
  {
    this.x *= a;
    this.y *= a;
    this.z *= a;

    return this;
  }

  div(a)
  {

  }

  toVec()
  {
    var v = new Vector();
    v.x = Math.sin(this.x) * Math.cos(this.y);
    v.y = -Math.sin(this.y);
    v.z = Math.cos(this.x) * Math.cos(this.y);

    return v;
  }

  set(x, y, z)
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

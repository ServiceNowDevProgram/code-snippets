// Hoisting differences (functions and classes are both hoisted and declared but classes are not initialized)

class Rectangle {
  constructor(height, width) {
    this.name = 'Rectangle';
    this.height = height;
    this.width = width;
  }
}

class FilledRectangle extends Rectangle {
  constructor(height, width, color) {
    super(height, width);
    this.name = 'Filled rectangle';
    this.color = color;
  }
}
const LinkedList = require("./lib/linkedList");

class Editor {
  /**
   * Constructs a new Editor object with the given text.
   * Defaults to empty text. Cursor is positioned at the end of the text.
   * @param {LinkedList} text - A linked List containing the characters that are in the editor,
   * empty by default
   */
  constructor(text = new LinkedList()) {
    this.text = text;
    this.cursor = this.text.find(
      (node, index) => index === this.text.length - 1
    );
  }

  /**
   * Insert a character at the cursor position of the editor.
   * @param {*} char a value to be inserted into the editor
   * @returns {Editor} a reference to this editor
   */
  insert(char) {
  if (this.cursor === null || this.text.length === 0) {
    // If the cursor is null or the editor is empty, insert char as the new head
    this.text.insertAtHead(char);
    this.cursor = this.text.head;
  } else {
    // Insert char at the cursor position
    this.text.insert(char, (node) => node === this.cursor);
    this.cursor = this.cursor.next; // Move the cursor one position to the right
  }
  return this; // Return a reference to this editor
}

  /**
   * Remove the character at the cursor position.
   * Moves the cursor to the previous position.
   * If editor is empty does nothing.
   * @returns {Editor} a reference to this editor
   */
  delete() {
  if (this.text.length === 0) {
    // If the editor is empty, do nothing
    return this;
  }

  if (this.cursor === null) {
    // If the cursor is at the start of the text, do nothing
    return this;
  }

  if (this.cursor === this.text.head) {
    // If the cursor is at the head of the text, delete the head
    this.text.head = this.text.head.next;
    this.cursor = null;
  } else {
    // Find the previous node before the cursor
    const previousNode = this.text.find((node) => node.next === this.cursor);

    if (previousNode) {
      // Remove the character currently indicated by the cursor
      previousNode.next = this.cursor.next;
      // Move the cursor to the previous character
      this.cursor = previousNode;
    }
  }

  return this; // Return a reference to this editor
}

  /**
   * Moves the cursor one position to the left.
   * If the cursor is at the start of the editor nothing happens.
   * @returns {Editor} a reference to this editor
   */
  arrowLeft() {
  if (this.cursor === null) {
    // If the cursor is null, do nothing
    return this;
  }

  if (this.cursor === this.text.head) {
    // If the cursor is at the head, move it before the head (null)
    this.cursor = null;
    return this;
  }

  // Find the previous node before the cursor
  const previousNode = this.text.find((node) => node.next === this.cursor);

  if (previousNode) {
    // Move the cursor to the previous character
    this.cursor = previousNode;
  }

  return this; // Return a reference to this editor
}

  /**
   * Moves the cursor one position to the right.
   * If the cursor is at the end of the editor nothing happens.
   * @returns {Editor} a reference t this editor
   */
  arrowRight() {
  if (this.cursor === null) {
    // If the cursor is null, move it to the head
    this.cursor = this.text.head;
  } else if (this.cursor.next !== null) {
    // If the cursor is not at the last character, move it to the next character
    this.cursor = this.cursor.next;
  }

  return this; // Return a reference to this editor
}
}

module.exports = Editor;

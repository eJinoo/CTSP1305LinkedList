// In order to create a linked list
// We have to create a node first.

// Node

// [10] -> [20] -> [30] -> [40] -> [50] -> null
class Node {
    constructor(data) {
        this.data = data; // Data on that node
        this.next = null; // Pointer to the next node
    }
}

let node1 = new Node(10);
let node2 = new Node(20);
let node3 = new Node(30)
let node4 = new Node(40);
let node5 = new Node(50);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;


console.log(node1);

// Traverse the Linked List

function traverseNodes(node) {
    let str = '';
    while(node !== null) {
        str = str + node.data + ' -> ';
        node = node.next;
    }

    console.log(str + ' null '); // 10 -> 20 -> 30 -> 40 -> 50 -> null
}


// Class LinkedList // size

// [1] --> null
// H                C
// [0] --> [1] --> null
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    prepend(data) {
        let newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode; // Updating the new Node to the head
        this.size++; // Increment the size
    }

    // ASSIGNMENT 1: Implement append method
    // Append A node.

    append(data){
        let newNode = new Node(data);
        newNode.next = null;

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;

            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode 
        }
        this.size++;
    }

    printList() {
        let current = this.head;
        let str = '';
        while(current !== null) {
            str = str + current.data + ' -> ';
            current = current.next;
        }

        console.log(str + ' null ');
    }

    // Count = 2
                //   [15]
  // H,         P       nN       C
    // [30] -> [20] -> [15] ->[10] -> null
    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            return null; // Out of bounds
        }

        let newNode = new Node(data);
        if (index === 0) {
            this.prepend(); // If the index is 0, prepend it.
        }

        let current = this.head;
        let previous;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }

        newNode.next = current;
        previous.next = newNode;
        this.size++;
    }

    // removeFirst
    // [30] -> [20] -> [15] ->[10] -> null
    removeFirst() {
        if (!this.head) {
            return null;
        }

        let removedNode = this.head;
        this.head = this.head.next;
        this.size--;
        return removedNode;
    }

    // Assignment:
    // Implement removeLast method
    removeLast(){
        if (this.size === 0) {
            return null;
        }

        if (this.size === 1){
            this.size--;
            return null;
        }

        let current = this.head;
        let previous;

        while (current.next !== null) {
            previous = current;
            current = current.next;
        }
        previous.next = null;
        this.size--;
    }

    // Remove at a specifc index

// Count = 1, index = 1
    //  P       C
    // [30] -> [15] ->[10] -> null
    removeAt(index) {
        if (index < 0 || index > this.size) {
            return null; // Out of bounds
        }

        if (index === 0) {
            return this.removeFirst();
        }

        let current = this.head;
        let previous;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }

        previous.next = current.next;
        this.size--;

        return current.data;
    }

        //,H                           C
     // [30] -> [20] -> [15] ->[10] -> null
    search(data) {
        let current = this.head;

        while (!current) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }

        return false;
    }
//  index = 3, data = 25;
 // count = 3;
       //                      C
    // [30] -> [20] -> [15] ->[10] -> null
    updateAt(data, index) {
        if (index < 0 || index > this.size) {
            return null; // Out of bounds
        }

        let current = this.head;
        let count = 0;

        while (count < index) {
            current = current.next;
            count++;
        }

        current.data = data; // Update the data that we want.

    }

    //Delete the N-th Node from the End (ASSIGNMENT)
    //1 -> 2 -> 3 -> 4 -> 5 and n = 2 , should return 1 -> 2 -> 3 -> 5
    deleteFrom(pos){
        if (pos < 0) {
            return false;
        }
    
        let current = this.head
        let index = this.size;
    
        if (pos === 0 && current) {
            this.head = current.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
            this.size--;
            return true;
        }
    
        while (current) {
            if (index === pos) {
                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }
    
                if (current.prev) {
                    current.prev.next = current.next;
                }
    
                this.size--;
                return true;
            }
    
            current = current.next;
            index--;
        }
    
        return false;
       }

    //Merge Two Sorted Linked Lists (ASSIGNMENT)
    //1 -> 3 -> 5 and 2 -> 4 -> 6 should become 1 -> 2 -> 3 -> 4 -> 5 -> 6
    mergeLinkedList(l1,l2){
        if(!l1){
           return l2;
        }
        if(!l2){
           return l1;
        }
  
        let mergeList = new LinkedList();
        let current = mergeList.head;
  
        let current1 = l1.head;
        let current2 = l2.head
  
        while(current1 && current2){
          if(current1.data <= current2.data){
              if(!current){
                  mergeList.head = current1;
                  current = mergeList.head;
              } else {
                  current.next = current1
                  current = current.next
              }
              current1 = current1.next;
          } else {
              if(!current){
                  mergeList.head = current2;
                  current = mergeList.head;
              } else {
                  current.next = current2;
                  current = current.next;
              }
              current2 = current2.next;
          }
        }
      if(current1){
          current.next = current1;
      } else {
          current.next = current2;
      }
  
      return mergeList
     }
}

let linkedList = new LinkedList();

let linkedList2 = new LinkedList();
let linkedList3 = new LinkedList();

// 10 -> null
// 20 -> 10 -> null
// 30 -> 20 -> 10 -> null
linkedList2.append(5);
linkedList2.append(12);
linkedList2.append(17);
linkedList2.append(32);

linkedList3.append(10);
linkedList3.append(20);
linkedList3.append(30);

linkedList.prepend(10);
linkedList.prepend(20);
linkedList.prepend(30);
linkedList.insertAt(15, 2);
linkedList.updateAt(25, 3);

// assignment
linkedList.removeLast();
linkedList.append(7);

// 30 -> 15 -> 10 -> null
linkedList.printList();
linkedList2.printList();

let mergedList = linkedList2.mergeLinkedList(linkedList2, linkedList3);

mergedList.printList();


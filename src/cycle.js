const cycle = (list) => {
    if (list.head == null) {
        return false;
    }

    let slow = list.head;
    let fast = list.head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
};

module.exports = cycle;

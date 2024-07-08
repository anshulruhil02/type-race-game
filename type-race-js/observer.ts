export interface Observer {
    update(): void;
  }
  
  export class Subject {
    private observers: Observer[] = [];
  
    addObserver(observer: Observer) {
      this.observers.push(observer);
      observer.update(); // Update the observer right away
    }
  
    removeObserver(observer: Observer) {
      this.observers = this.observers.filter((o) => o !== observer);
    }
  
    protected notifyObservers() {
      this.observers.forEach((o) => o.update());
    }
  }
  
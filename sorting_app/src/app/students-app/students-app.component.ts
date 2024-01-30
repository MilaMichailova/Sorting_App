import { IStudent } from './../Istudent';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

// сделали перечисление типов по которым можно производить сортировку массива
enum SortTypes {
  FirstName = 'firstName',
  LastName = 'lastName',
  Age = 'age',
}

@Component({
  selector: 'app-students-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students-app.component.html',
  styleUrl: './students-app.component.scss',
})
export class StudentsAppComponent {
  //объявили публичное свойство состояния загрузки по умолчанию фолс
  public isLoading: boolean = false;

  //объявили массив студентов с одним предзаполненным значением
  public students: IStudent[] = [
    { firstName: 'Anna', lastName: 'Li', age: 18 },
  ];

  //объявили публичное свойство для выбранного типа сортировки
  public selectedSortType: SortTypes = SortTypes.Age;

  /**
   * Заполняет массив студентов случайно сгенерированными объектами в количестве 10 000 штук.
   */
  fillStudents() {
    this.students = [];
    while (this.students.length < 10_000) {
      this.students.push(this.createStudent());
    }
  }

  /**
   * Сортирует массив студентов методом пузырьковой сортировки.
   */
  bubbleSort() {
    this.isLoading = true;
    for (let i = 0; i < this.students.length; i++) {
      for (let j = 0; j < this.students.length - i; j++) {
        if (
          !!this.students[j + 1] &&
          //выбранный тип сортировки должен быть использован в месте сравнения!
          this.students[j][this.selectedSortType] >
            this.students[j + 1][this.selectedSortType]
        ) {
          [this.students[j], this.students[j + 1]] = [
            this.students[j + 1],
            this.students[j],
          ];
        }
      }
    }
    console.log('пузырек', this.students);
    this.isLoading = false;
  }

  selectedSort() {
    this.isLoading = true;
    for (let i = 0; i < this.students.length; i++) {
      let min = i;

      for (let j = i + 1; j < this.students.length; j++) {
        if (
          this.students[min][this.selectedSortType] >
          this.students[j][this.selectedSortType]
        ) {
          min = j;
        }
      }
      // this.students[i] = this.students[min];

      // const tmp = this.students[i];
      // this.students[min] = tmp;

      [this.students[i], this.students[min]] = [
        this.students[min],
        this.students[i],
      ];
    }
    console.log('выбором', this.students);
    this.isLoading = false;
  }

  // private sortSelected(arr: IStudent[]) {
  //   for (let i = 0; i < arr.length; i++) {
  //     let min = i;

  //     for (let j = i + 1; j < arr.length; j++) {
  //       if (arr[min] > arr[j]) {
  //         min = j;
  //       }
  //     }

  //     // [arr[i], arr[min]] = [arr[min], arr[i]];

  //     arr[i] = arr[min];

  //     const tmp = arr[i];
  //     arr[min] = tmp;
  //   }
  //   return console.log('выбором', this.students);
  // }

  cycleSort() {
    for (let i = 0; i < this.students.length; i++) {
      let currentlySelectedItem = this.students[i];
      let position = i;
      for (let j = i + 1; j < this.students.length; j++) {
        if (
          this.students[j][this.selectedSortType] <
          currentlySelectedItem[this.selectedSortType]
        ) {
          position++;
        }
      }
      if (position === i) {
        continue;
      }
      while (
        currentlySelectedItem[this.selectedSortType] ===
        this.students[position][this.selectedSortType]
      ) {
        position++;
      }
      [this.students[position], currentlySelectedItem] = [
        currentlySelectedItem,
        this.students[position],
      ];
      while (position !== i) {
        position = i;
        for (let k = i + 1; k < this.students.length; k++) {
          if (
            this.students[k][this.selectedSortType] <
            currentlySelectedItem[this.selectedSortType]
          ) {
            position++;
          }
        }
        while (
          currentlySelectedItem[this.selectedSortType] ===
          this.students[position][this.selectedSortType]
        ) {
          position++;
        }
        [this.students[position], currentlySelectedItem] = [
          currentlySelectedItem,
          this.students[position],
        ];
      }
    }
    // return arr;
    console.log('циклически', this.students);
  }

  testSelectedSort() {
    const array = [3, 8, 5, 11];
    for (let i = 0; i < array.length; i++) {
      let min = i;

      for (let j = i + 1; j < array.length; j++) {
        if (array[min] > array[j]) {
          min = j;
        }
      }
      [array[i], array[min]] = [array[min], array[i]];
    }
    console.log('выбором тест', array);
  }

  testFastSort() {
    const array = [3, 8, 5, 11];

    this.quickSort(array, 0, array.length - 1);
    console.log('быстрая', array);
  }

  private quickSort(array: number[], start: any, end: any) {
    if (start < end) {
      const pi = this.partition(array, start, end);

      this.quickSort(array, start, pi - 1);
      this.quickSort(array, pi + 1, end);
    }
  }

  private partition(array: number[], start: any, end: any) {
    const pivot = array[end];
    let i = start;

    for (let j = start; j <= end - 1; j++) {
      if (array[j] <= pivot) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
      }
    }

    [array[i], array[end]] = [array[end], array[i]];
    return i;
  }

  testNumberCycleSort() {
    const array = [3, 8, 5, 11];

    for (let i = 0; i < array.length; i++) {
      let currentlySelectedItem = array[i];
      let position = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < currentlySelectedItem) {
          position++;
        }
      }
      if (position === i) {
        continue;
      }
      while (currentlySelectedItem === array[position]) {
        position++;
      }
      [array[position], currentlySelectedItem] = [
        currentlySelectedItem,
        array[position],
      ];
      while (position !== i) {
        position = i;
        for (let k = i + 1; k < array.length; k++) {
          if (array[k] < currentlySelectedItem) {
            position++;
          }
        }
        while (currentlySelectedItem === array[position]) {
          position++;
        }
        [array[position], currentlySelectedItem] = [
          currentlySelectedItem,
          array[position],
        ];
      }
    }
    // return arr;
    console.log('циклически', array);
  }

  private randomString(length: number): string {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  private randomNumber(): number {
    let min = Math.ceil(16);
    let max = Math.floor(45);
    return Math.floor(Math.random() * (45 - 16 + 1) + 16);
  }

  private createStudent(): IStudent {
    const student: IStudent = {
      firstName: this.randomString(10),
      lastName: this.randomString(12),
      age: this.randomNumber(),
    };
    return student;
  }

  fastSort() {
    const partition = (arr: IStudent[], start: any, end: any) => {
      const pivot = arr[end];
      let i = start;

      for (let j = start; j <= end - 1; j++) {
        if (arr[j] <= pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          i++;
        }
      }

      [arr[i], arr[end]] = [arr[end], arr[i]];
      return i;
    };

    const quickSort = (arr: IStudent[], start: any, end: any) => {
      if (start < end) {
        const pi = partition(arr, start, end);

        quickSort(arr, start, pi - 1);
        quickSort(arr, pi + 1, end);
      }
    };
    return console.log('быстрая', this.students);
  }
}

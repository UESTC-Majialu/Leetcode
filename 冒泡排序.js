const bubble = (arr) => {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (
      let j = 0;
      j < n - i - 1;
      j++
    ) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [
          arr[j + 1],
          arr[j],
        ];
      }
    }
  }
};

const arr = [
  31, 65, 82, 76, 13, 27, 10,
];
bubble(arr);
console.log(arr);
console.log('hello');

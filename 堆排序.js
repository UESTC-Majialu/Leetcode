/**
 * 大根堆：根>=左，右
 * 待排序元素从arr[1]开始存放
 */

// 建立大根堆,时间复杂度O(n)
function BuildMaxHeap(arr,len){
  // 从后往前调整所有非终端结点
  for(let i = Math.floor(len/2); i > 0; i--){
    HeadAdjust(arr,i,len);
  }
}

// 将以序号k为根的子树调整成大根堆
function HeadAdjust(arr,k,len){
  arr[0] = arr[k];      // arr[0]暂存根节点
  for(let i=2*k;i<=len;i*=2){
    // 如果右孩子更大，则让i指向右孩子
    if(i<len && arr[i]<arr[i+1]){
      i++;
    }
    if(arr[0]>=arr[i]) break;   // 如果根>=左右孩子，则调整结束
    else{
      arr[k] = arr[i];          // 将arr[i]调整到父节点上
      k = i;                    // 修改k值，以便继续向下筛选
    }
  }
  // 被筛选结点的值放入最终位置
  arr[k] = arr[0];
}

// 堆排序：每一趟将堆顶元素与待排序序列中最后一个元素交换,时间复杂度每一趟O(logn)，共n趟，时间复杂度O(nlogn)
function HeapSort(arr,len){
  BuildMaxHeap(arr,len);    // 初始建堆
  for(let i=len;i>1;i--){
    // n-1趟的交换和建堆过程
    [arr[1],arr[i]] = [arr[i],arr[1]];  // 将堆顶元素与末尾元素交换
    HeadAdjust(arr,1,i-1);              // 继续调整堆
  }
}

const arr = [0,-1,3,4,5,8,2,6];
HeapSort(arr,arr.length-1);
arr.shift();
console.log(arr);
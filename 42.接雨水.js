/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  const n = height.length;
  const stack = [];
  let ans = 0;
  for(let i=0;i<n;i++){
    while(stack.length && height[i] > height[stack[stack.length-1]]){
      const top = stack.pop();
      if(!stack.length) break;
      const left = stack[stack.length-1];
      const curWidth = i - left - 1;
      const curHeight = Math.min(height[left], height[i]) - height[top];
      ans += curWidth * curHeight;
    }
    stack.push(i);
  }
  return ans;
};
// @lc code=end


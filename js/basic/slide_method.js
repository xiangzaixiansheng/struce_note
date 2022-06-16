//滑动窗口设计

// int right = 0;
// int left = 0;
// while (right < s.length()) {
//     window.add(s[right])
//     right++;
//     //1.window数据更新
//     while (2. 窗口收缩判定) {
//         window.remove(s[left])
//         left++;
//         //1.window数据更新
//     }
// }
// //3.根据业务需求得到最终结果

const test = 'abccbadaacd';

const lengthOfLongestSubstring = function(s) {
    const set = new Set(); //判断滑动窗口内是否有重复元素
    let right = 0, //滑动窗口右边界
        left = 0, //滑动窗口左边界
        maxLength = 0;
    if (s.length === 0) { //极端情况
        return 0;
    }
    for (right; right < s.length; right++) {
        if (!set.has(s[right])) { //当前元素不在set中 就加入set 然后更新最大长度，i++继续下一轮循环
            set.add(s[right]);
            maxLength = Math.max(maxLength, set.size);
        } else {
            //set中有重复元素不断让left++ 并删除窗口之外的元素 直到滑动窗口内没有重复的元素
            while (set.has(s[right])) {
                set.delete(s[left]);
                left++;
            }
            set.add(s[right]); //放心将s[i]加入set中
        }
    }
    return maxLength;
};


console.info(lengthOfLongestSubstring(test))
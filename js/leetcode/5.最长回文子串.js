/*
 * @lc app=leetcode.cn id=5 lang=golang
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (24.38%)
 * Total Accepted:    38.2K
 * Total Submissions: 155.7K
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 *
 * 示例 1：
 *
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 *
 *
 * 示例 2：
 *
 * 输入: "cbbd"
 * 输出: "bb"
 *
 *
 */

const longestPalindrome = (s) => {
    let res = ''
    for (let i = 0; i < s.length; i++) {
        let left = i - 1,
            right = i + 1 // s为奇数长度
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--, right++
        }
        if (res.length < right - left - 1) {
            res = s.substring(left + 1, right)
        }

        left = i, right = i + 1 // s为偶数长度
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--, right++
        }
        if (res.length < right - left - 1) {
            res = s.substring(left + 1, right)
        }
    }
    return res
};
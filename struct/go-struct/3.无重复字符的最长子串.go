package main

/*
 * @lc app=leetcode.cn id=3 lang=golang
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (28.06%)
 * Total Accepted:    79.6K
 * Total Submissions: 282.8K
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * 示例 1:
 *
 * 输入: "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 *
 * 示例 2:
 *
 * 输入: "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 * 输入: "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 */

func lengthOfLongestSubstring(s string) int {
	n := len(s)
	m := map[byte]int{}
	left, maxLength := 0, 0
	//处理极端现象
	if n == 0 {
		return 0
	}
	var max func(a, b int) int
	max = func(a, b int) int {
		if a > b {
			return a
		}
		return b
	}
	for right := 0; right < n; right++ {
		if _, exsit := m[s[right]]; !exsit {
			m[s[right]]++
			maxLength = max(maxLength, len(m))
		} else {
			for m[s[right]] > 0 {
				delete(m, s[left])
				left++
			}
			m[s[right]]++
		}

	}
	return maxLength
}

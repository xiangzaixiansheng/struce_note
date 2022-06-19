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
package main

import "fmt"

//双指针解法
func longestPalindrome(s string) string {
	//双指针法
	start := 0   //记录最长回文子串的起始位置
	end := 0     //记录最长回文子串的末尾位置
	ln := len(s) //s的长度
	for i := 0; i < ln; {
		//左右指针，向两边扩展
		l, r := i, i

		//先考虑回文子串可能是偶数的情况，让r先走
		for r < ln-1 && s[r] == s[r+1] { //防止越界，一直向后比较，不相等停止
			r++
		}
		//i到达r所扩展的最远长度的下一个字符 for中的第三个条件
		i = r + 1
		fmt.Println("i2", i)

		//两边一起扩展
		for l > 0 && r < ln-1 && s[l-1] == s[r+1] {
			l--
			r++
		}

		//更新最长回文子串的长度和起始点
		if (end - start) < (r - l) {
			start = l
			end = r
		}

	}

	return s[start : end+1]
}

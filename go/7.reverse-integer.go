/*
 * @lc app=leetcode.cn id=7 lang=golang
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (31.16%)
 * Total Accepted:    75.3K
 * Total Submissions: 241.4K
 * Testcase Example:  '123'
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 *
 * 示例 1:
 *
 * 输入: 123
 * 输出: 321
 *
 *
 * 示例 2:
 *
 * 输入: -123
 * 输出: -321
 *
 *
 * 示例 3:
 *
 * 输入: 120
 * 输出: 21
 *
 *
 * 注意:
 *
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 *
 */
package main

import "math"

// 不等于0

// 小于最小除10，大于最大除10

// 乘10，模10，除10

func reverse(x int) int {
	ans := 0
	for x != 0 {
		if ans < math.MinInt32/10 || ans > math.MaxInt32/10 {
			return 0
		}
		ans = ans*10 + x%10
		x /= 10
	}
	return ans
}

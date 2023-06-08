'''
 * @lc app=leetcode.cn id=3 lang=python3
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
 *
 '''
class Solution:
	def lengthOfLongestSubstring(self, s: str) -> int:
		n = len(s)
		left, max_length = 0, 0
		_map = {}
		# 特殊情况判断
		if n == 0:
			return 0
		for _index in range(len(s)):
			if _map.get(s[_index]) is None:
				# 不存在数据的话
				_map[s[_index]] = 1
				max_length = max(max_length, len(_map))
			else:
				# 如果不为空的话 就一直弹出
				while _map.get(s[_index]) is not None:
					# 去除map中的参数
					del _map[s[left]]
					left += 1
				# 在把这一条数据添加上
				_map[s[_index]] = 1
		return max_length


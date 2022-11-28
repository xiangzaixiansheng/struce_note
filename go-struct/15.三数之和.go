/*
 * @lc app=leetcode.cn id=15 lang=golang
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (22.51%)
 * Likes:    1015
 * Dislikes: 0
 * Total Accepted:    58.1K
 * Total Submissions: 258.1K
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0
 * ？找出所有满足条件且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 * 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 *
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 *
 *
 */
package main

import (
	"sort"
)

// 排序后固定一个数nums[i]
// 1. 固定一个数nums[i]若是>0 那么和必然不等于0 跳过
// 2. 若是nums[i] == nums[i+1], 则去重, 跳过
// 2. 若是nums[i] < 0,则向后生成两个指针left和right
// 若是nums[left] == nums[left+1] 则left++
// 若是nums[right] == nums[right-1] 则right--

func threeSum(nums []int) [][]int {
	ans := [][]int{}
	length := len(nums)
	if nums == nil || length < 3 {
		return ans
	}
	sort.Ints(nums)
	for i := 0; i < length; i++ {
		// 如果当前数字大于0，则三数之和一定大于0，所以结束循环
		if nums[i] > 0 {
			break
		}
		// 去重
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}

		L := i + 1
		R := length - 1
		for L < R {
			sum := nums[i] + nums[L] + nums[R]
			if sum == 0 {
				res := []int{nums[i], nums[L], nums[R]}
				ans = append(ans, res)
				for L < R && nums[L] == nums[L+1] {
					L++ // 去重
				}
				for L < R && nums[R] == nums[R-1] {
					R-- // 去重
				}
				L++
				R--
			} else if sum > 0 {
				R--
			} else if sum < 0 {
				L++
			}
		}

	}
	return ans
}

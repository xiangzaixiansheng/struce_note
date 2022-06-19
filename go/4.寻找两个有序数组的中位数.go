package main

import "fmt"

/*
 * @lc app=leetcode.cn id=4 lang=golang
 *
 * [4] 寻找两个有序数组的中位数
 *
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (35.92%)
 * Likes:    1513
 * Dislikes: 0
 * Total Accepted:    89.7K
 * Total Submissions: 249.7K
 * Testcase Example:  '[1,3]\n[2]'
 *
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 *
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 *
 * 你可以假设 nums1 和 nums2 不会同时为空。
 *
 * 示例 1:
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3] ，中位数 2
 *
 *
 * 示例 2:
 *
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 *
 * 合并数组 = [1,2,3,4], 则中位数是 (2 + 3)/2 = 2.5
 *
 *
 */

/*
* 思路：双指针操作, 一种是只记录到中位数的前后(left,right)，如果是去余数位1则中位数为right，否则是(left+right)/2
*				还是双指针，合并两个有序数据在找对应的数据。
**/
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	n, m := len(nums1), len(nums2)
	length := n + m
	//双指针, l1对应nums1, l2对应nums2
	l1, l2 := 0, 0
	left, right := 0, 0
	for i := 0; i <= length/2; i++ {
		//每次进入循环都把上一次的right值赋值给left值
		left = right
		//注意 l2 >=m 要放在前面避免数据越界
		if l1 < n && (l2 >= m || nums1[l1] < nums2[l2]) {
			right = nums1[l1]
			l1++
		} else {
			right = nums2[l2]
			l2++
		}
	}
	fmt.Println("left:", left, "right:", right)
	if length%2 == 1 {
		return float64(right)
	}
	return float64(left+right) / 2.0

}

// 方法二:合并数组
func findMedianSortedArrays2(l1 []int, l2 []int) (out float64) {
	n, m := len(l1), len(l2)
	ls := make([]int, n+m)
	var i, j, k int
	for ; k < n+m; k++ {
		if i < n && j < m {
			if l1[i] < l2[j] {
				ls[k] = l1[i]
				i++
			} else {
				ls[k] = l2[j]
				j++
			}
		} else if i < n {
			ls[k] = l1[i]
			i++
		} else if j < m {
			ls[k] = l2[j]
			j++
		}
	}
	if k%2 == 1 {
		return float64(ls[k/2])
	} else {
		return float64(ls[k/2-1]+ls[k/2]) / 2
	}
}

// func main() {
// 	a := []int{0, 0}
// 	b := []int{0, 0}
// 	fmt.Println(findMedianSortedArrays(a, b))
// }

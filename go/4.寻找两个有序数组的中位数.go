package main

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

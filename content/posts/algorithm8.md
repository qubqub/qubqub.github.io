---
title: "AlgorithmStudy_백준 1181"
date: 2021-11-12T23:39:46+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---
# 알고리즘 공부 {{< color color="#FFD400" text="백준 1181" >}} 🧐
#### 단어 정렬


## 👉문제
알파벳 소문자로 이루어진 N개의 단어가 들어오면 아래와 같은 조건에 따라 정렬하는 프로그램을 작성하시오.

1. 길이가 짧은 것부터
2. 길이가 같으면 사전 순으로



## 👉입력  
첫째 줄에 단어의 개수 N이 주어진다. (1 ≤ N ≤ 20,000) 둘째 줄부터 N개의 줄에 걸쳐 알파벳 소문자로 이루어진 단어가 한 줄에 하나씩 주어진다. 주어지는 문자열의 길이는 50을 넘지 않는다.



## 👉출력
조건에 따라 정렬하여 단어들을 출력한다. 단, 같은 단어가 여러 번 입력된 경우에는 한 번씩만 출력한다.  



🍑풀이 1 

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace Algorithm8
{
    class Beakjun1181
    {
        static void Main(string[] args)
        {
            List<string> words = new List<string>();
            var count = int.Parse(Console.ReadLine()!);
            
            for (int i = 0; i < count; i++)
            {
                string word = Console.ReadLine();
                if (words.Exists(x=> x== word) == false)
                {
                    words.Add(word);
                }
            }
            //알파벳 순으로 정렬
            var list = words.OrderBy(x => x);
            //길이 순으로 정렬
            var result = list.OrderBy(x => x.Length);
            
            Console.WriteLine(string.Join("\n", result));
        }
    }
}
```
😿 풀이 2 {{< color color="#EF5350" text="시간초과로 맞히지 못한 Quick Sort를 이용한 풀이" >}}

```csharp
using System;
using System.Collections.Generic;

namespace Algorithm8
{
    class Beakjun1181
    {
        static void Main(string[] args)
        {
            List<string> words = new List<string>(); 
            var count = int.Parse(Console.ReadLine()!);
     
            for (int i = 0; i < count; i++)
            {
                string word = Console.ReadLine();
                if (words.Exists(x=> x== word) == false)
                {
                    words.Add(word);
                }
            }
            
            int left = 0;
            int right = words.Count - 1;
            
            Sort(left, right);

            void Sort(int _left, int _right)
            {
                if (_left >= _right)
                {
                    return;
                }
                var pivot = Divide(_left, _right);
                Sort(_left, pivot - 1);
                Sort(pivot + 1, _right);
            }
            int Divide(int _left, int _right)
            {
                int _pivot = _left;
                _left++;
                while (true)
                {
                    if (words[_pivot].Length >= words[_left].Length)
                    {
                        if (words[_pivot].Length == words[_left].Length)//길이가 같을 경우
                        {
                            for (int i = 0; i < words[_pivot].Length; i++)//각 자리를 비교하기
                            {
                                if (words[_pivot][i] < words[_left][i])//피봇의 알파벳이 우선일 경우 
                                {
                                    break;
                                }
                                else if(words[_pivot][i] > words[_left][i])//피봇의 알파벳이 후순위일 경우
                                {
                                    _left++;//left를 한 칸 뒤로 옮기기
                                    break;
                                }
                            }
                        }
                        else//피봇의 값이 왼쪽의 값보다 길 경우
                        {
                            _left++;//left를 한 칸 옮기기
                        }
                    }
                    if (words[_pivot].Length <= words[_right].Length)
                    {
                        if (words[_pivot].Length == words[_right].Length)//길이가 같을 경우
                        {
                            for (int i = 0; i < words[_pivot].Length; i++)//각 자리를 비교하기
                            {
                                if (words[_pivot][i] > words[_left][i])//피봇의 알파벳이 후순위일 경우
                                {
                                    break;
                                }
                                else if (words[_pivot][i] < words[_right][i])//피봇의 알파벳이 우선일 경우
                                {
                                    _right--;//right를 한 칸 앞으로 옮기기
                                    break;
                                }
                            }
                        }
                        else
                        {
                            _right--;//right를 한 칸 앞으로 옮기기
                        }
                    }

                    if (_left > _right)//left와 right가 역전되었을 경우 
                    {
                        break;
                    }
                    if (words[_left].Length > words[_right].Length)// left의 값이 right의 값보다 클 경우 서로 swap
                    {
                        (words[_left], words[_right]) = (words[_right], words[_left]);
                    }
                }
                (words[_pivot], words[_right]) = (words[_right], words[_pivot]);//역전된 right값과 pivot값을 swap
                return _right;//right반환 => 다음 pivot
            }
            Console.WriteLine(string.Join("\n", words));
    
        }
    
```

최악의 경우 시간복잡도가 O(n^2)로 매우 성능이 떨어지게 된다. <br>
아마 이걸 잡나보다.... <br>
Quick Sort 말고 Merge Sort를 사용해 볼 걸 그랬다...   

<br>

[문제풀러가기] (https://www.acmicpc.net/problem/1181)
---
title: "AlgorithmStudy_백준 11866"
date: 2021-11-12T04:21:22+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---

# 알고리즘 공부 {{< color color="#FFD400" text="백준 11866" >}} 🧐
#### 오세푸스 문제    


## 👉문제
요세푸스 문제는 다음과 같다.

1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다. 이제 순서대로 K번째 사람을 제거한다. 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다. 이 과정은 N명의 사람이 모두 제거될 때까지 계속된다. 원에서 사람들이 제거되는 순서를 (N, K)-요세푸스 순열이라고 한다. 예를 들어 (7, 3)-요세푸스 순열은 <3, 6, 2, 7, 5, 1, 4>이다.

N과 K가 주어지면 (N, K)-요세푸스 순열을 구하는 프로그램을 작성하시오.


## 👉입력  
첫째 줄에 N과 K가 빈 칸을 사이에 두고 순서대로 주어진다. (1 ≤ K ≤ N ≤ 1,000)


## 👉출력
예제와 같이 요세푸스 순열을 출력한다.  



🍑풀이 1

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Algorithm1
{
    public static class Program
    {
        public static void Main()
        {
            var input = Console.ReadLine().Split(' ').Select(int.Parse).ToArray();
            int n = input[0];
            int k = input[1];

            var index = k - 1;
            
            Queue result = new Queue();
            int[] people = new int[n];

            for (int i = 0; i < n; i++)
            {
                people[i] = i + 1;
            }

            //배열로 하는 풀이
            while (result.Count != n)//결과의 갯수가 n 값이 아닌동안
            {
                if (people[index] > 0)//값이 0보다 크면
                {
                    result.Enqueue(people[index]);//결과에 enqeue
                    people[index] = 0;//결과에 넣은 값은 0으로
                }

                if (result.Count == n)
                {
                    break;
                }

                for (int i = 0; i < k; i++)//k번동안 인덱스 변경
                {
                    index = (index + 1) % n;//n의 크기를 넘지 않도록 설계
                    while(people[index] == 0)//값이 0인 경우 횟수로 치지 않음
                    {
                        index = (index + 1) % n;
                    }
                }
            }
            
            StringBuilder st = new StringBuilder();
            
            st.Append("<");
            st.Append(string.Join(", ", result.ToArray()));
            st.Append(">");

            Console.WriteLine(st);

        }
    }
}
```  


🍑풀이 2
```csharp
using System;
using System.Collections;
using System.Linq;

namespace Algorithm1
{
    public static class Program
    {
        public static void Main()
        {
            var input = Console.ReadLine().Split(' ').Select(int.Parse).ToArray();
            int n = input[0];
            int k = input[1];
            Queue result = new Queue();
            Queue que = new Queue();
            for (int i = 1; i <= n; i++)
            {
                que.Enqueue(i);
            }
            //queue를 이용한 풀이
            while (result.Count != n)
            {
                for (int i = 0; i < k - 1; i++)//k-1번째까지는 dequeue 후 다시 enqueue 
                {
                    var pop =que.Dequeue();
                    que.Enqueue(pop);
                }
                result.Enqueue(que.Dequeue());//k번째에 결과값에 추가
            }

            var r = string.Join(", ", result.ToArray());
            Console.WriteLine($"<{r}>");

        }
    }
}

```
🤣🤣
 배열로 푼다고 고집부렸다가 애먹음..

 
 큐로 푸는 것이 정신건강에 좋은 것 같다.


[문제풀러가기](https://www.acmicpc.net/problem/11866)



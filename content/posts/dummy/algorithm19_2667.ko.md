---
title: "AlgorithmStudy_백준 2667"
description: "description test"
date: 2021-12-12T23:15:57+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
series: ["BAEKJOON Online Judge"]
chapter: [""]
author: ["Hyemi Oh"]
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowCodeCopyButtons: true
ShowCreativeCommons: true
ShowToc: true
TocOpen: false
ShowTocAside: true
comments: true
disableShare: false
searchHidden: false
cover:
  hidden: true
  image: ""
  alt: ""

draft: false
---

알고리즘 문제는 github에 repository를 만든 후에 포스팅하지않으려고 했는데, 이 문제는 공유해서 올리면 좋을거 같아서 올렸다!! 오랜만에...ㅎㅎ

# 알고리즘 공부 {{< color color="#FFD400" text="백준 2667" >}} 🧐
#### 제로

## 👉문제
<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.  

![그림1,그림2](/images/algorithm19.png)

<br>

## 👉입력  
첫 번째 줄에는 지도의 크기 N(정사각형이므로 가로와 세로의 크기는 같으며 5≤N≤25)이 입력되고, 그 다음 N줄에는 각각 N개의 자료(0혹은 1)가 입력된다. 


<br>

## 👉출력
첫 번째 줄에는 총 단지수를 출력하시오. 그리고 각 단지내 집의 수를 오름차순으로 정렬하여 한 줄에 하나씩 출력하시오.  

<br>

🍑풀이
```csharp
namespace Algorithm19
{
    class Baekjoon2667
    {
        static void Main(string[] args)
        {
            char house = '1';
            char visitedHouse = '2';
            
            int N = int.Parse(Console.ReadLine()!);
            var arr = new char[N,N];
            var list = new char[N];
            for (int i = 0; i < N; i++)
            {
                list = Console.ReadLine()!.ToCharArray();
                for (int j = 0; j < N; j++)
                {
                    arr[i,j] = list[j];
                }
            }
            
            List<int> countList = new List<int>();

            int c = 0;
            for (int r= 0; r < N; r++)
            {
                for (; c < N; c++)
                {
                    if (arr[r, c] != house)
                    {
                        continue;
                    }
                    countList.Add(DFS(r, c));
                }
                c = 0;
            }
            
            Console.WriteLine(countList.Count);

            countList.Sort();
            for (int i = 0; i < countList.Count; i++)
            {
                Console.WriteLine(countList[i]);
            }
            
        
            int DFS(int r, int c)
            {
                int cnt = 0;
                if (arr[r, c] == house)
                {
                    arr[r, c] = visitedHouse;
                    cnt++;
                }
                //방법1 
                if (r + 1 < N && arr[r + 1, c] == house) //오른쪽
                {
                    cnt += DFS(r + 1, c);
                }

                if (r - 1 >= 0 && arr[r - 1, c] == house) //왼쪽
                {
                    cnt += DFS(r - 1, c);
                }

                if (c - 1 >= 0 && arr[r, c - 1] == house) //아래쪽
                {
                    cnt += DFS(r, c - 1);
                }
                
                if (c + 1 < N && arr[r, c + 1] == house) //위쪽
                {
                    cnt += DFS(r, c + 1);
                }
                //방법2
                //상하좌우(4 Way) 움직임..
                int[] dx = {0, 1, 0, -1};
                int[] dy = {1, 0, -1, 0};
                for(int d = 0; d < 4; d++) // 상하좌우 탐색
                {
                    int nX = x + dx[d]; // 새로운 x좌표
                    int nY = y + dy[d]; // 새로운 y좌표
                
                    if(nX < 0 || nX >= N || nY < 0 || nY >= N) 
                    // Out of Bound 체크 - 맵의 경계를 넘어가나 체크하는 것이다.
                    {    
                      continue;
                    }
                    if(board[nX, nY] == house) 
                    // 새로 이동할 위치에 아파트 건물이 있고, 아직 방문하지 않은 정점이라면
                    {   
                       DFS(nX, nY); // 이 위치에서 DFS 호출
                    }
                }

                return cnt;
            }
        }
       
    }
}

```

<br>

[문제풀러가기](https://www.acmicpc.net/problem/2667)

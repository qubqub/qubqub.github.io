# [아이템 84] 프로그램의 동작을 스레드 스케줄러에 기대지 말라.

구체적인 스케줄링 정책은 운영체제 마다 다를 수 있다. 따라서 이 정책에 죄지우지 되면 안 된다. 실행 가능한 스레드의 평균적인 수를 프로세스 수보다 지나치게 많아지지 않도록 하는 것이 좋은 프로그래램이다. 그래야 스케줄러가 고민할 거리가 줄기 때문이다.
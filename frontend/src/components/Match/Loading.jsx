import { useEffect, useState } from 'react';
import Lottie from '../Lottie';

export const Loading = (props) => {
  const isComplete = props.isComplete;

  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    const handle = setTimeout(() => setIsPending(false), 3000);
  }, []);
  return (
    <>
      <div className="matchingLottie">
        {isPending ? <WaitingImage /> : isComplete ? <CompleteLottie /> : <FailureLottie />}
      </div>
      <p className="matchingMessage">
        {isPending
          ? '내 주변 식재료를 찾고 있어요'
          : isComplete
          ? '식재료 매칭이 완료됐어요!'
          : '조건에 맞는 유저를 찾을 수 없어요'}
      </p>
    </>
  );
};

const WaitingImage = (props) => (
  <Lottie
    {...props}
    data-testid="searchNotFound"
    src="https://assets5.lottiefiles.com/packages/lf20_vvx2gjpt.json"
  />
);

const CompleteLottie = (props) => (
  <Lottie
    {...props}
    data-testid="completeLottie"
    src="https://assets5.lottiefiles.com/packages/lf20_keqlhgrz.json"
  />
);

const FailureLottie = (props) => (
  <Lottie
    {...props}
    data-testid="completeLottie"
    src="https://assets9.lottiefiles.com/packages/lf20_ddxv3rxw.json"
  />
);

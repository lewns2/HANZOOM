import { useEffect, useState } from 'react';
import { Loading } from '../../components/Match/Loading';
import { Complete } from '../../components/Match/Complete';

import './Match.scss';

export const Match = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handle = setTimeout(() => setIsLoading(false), 8500);
  }, []);

  return (
    <section className="container">
      <div className="matchWrap">
        <div className="matchBody">{isLoading ? <Loading /> : <Complete />}</div>
      </div>
    </section>
  );
};

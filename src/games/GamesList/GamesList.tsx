import React, { Suspense } from 'react';
import { useParams } from "react-router-dom";
import ErrorBoundary from '../../pages/ErrorBoundarry';
 function GamesList() {
    let params = useParams();
    const Component = React.lazy(() => import(`../${params.gameId}/Game.tsx`));
    return (
        <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      </Suspense>
    </div>
    )
}

export default GamesList
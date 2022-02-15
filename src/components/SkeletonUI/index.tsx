import SkeCSS from './Skeleton.module.css';
import { Skeleton } from '@mui/material';

function SkeletonUI() {
  return (
    <div className={SkeCSS.container}>
      <div>
        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />
      </div>
      <div>
        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={400}
          height={30}
          animation="wave"
        />
      </div>
    </div>
  );
}

export default SkeletonUI;

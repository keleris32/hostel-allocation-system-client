import LoaderCSS from './Preloader.module.css';

function Preloader(): JSX.Element {
  return (
    <div className={LoaderCSS.preLoader}>
      <div className={LoaderCSS.shape}>
        <div className={LoaderCSS.circle}></div>
        <div className={LoaderCSS.circle}></div>
        <div className={LoaderCSS.circle}></div>
      </div>
      <div className={LoaderCSS.shadow}>
        <div className={LoaderCSS.shapeShadow}></div>
        <div className={LoaderCSS.shapeShadow}></div>
        <div className={LoaderCSS.shapeShadow}></div>
      </div>
    </div>
  );
}

export default Preloader;

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SortFilter from '../../../components/SortFilter';
import { listProducts } from '../../../apis/productAPI';
import './dealScreen.css';

import MessageBox from '../../../components/MessageBox';
import Carousel, { responsive, NAV, SORT } from '../../../constants';
import SubNavCategories from '../../../components/Nav/SubNavCategories';
import SearchBanner from '../../../components/Nav/SearchBanner';
import { loadingFallback } from '../../../components/Fallbacks';
import { dummyMovies } from '../../../utils';
import { useDebounce } from '../../../hooks/useDebounce';
import { useShadow } from '../../../hooks/useShadow';

const ProductCard = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../components/ProductCard')
);

export function _DealScreen() {
  const dispatch = useDispatch();
  const {
    category: paramCat = NAV.DEAL,
    order = SORT.BESTSELLING.OPT,
    pageNumber = 1
  } = useParams();
  const productList = useSelector((state) => state.productList);
  const { shadowOf } = useShadow();

  const [list, setList] = useState(null);

  const banner = useRef('');
  const category = useRef('');
  const preloadingCat = useRef('');

  useEffect(() => {
    banner.current = Math.random() < 0.5 ? 'screen--1' : '';
  }, [category, paramCat, order, pageNumber]);

  const _preload = (_category) => {
    dispatch(
      listProducts({
        pageNumber,
        order,
        category: _category === NAV.DEAL ? '' : _category,
        deal: 1,
        pageSize: 990
      })
    );
    preloadingCat.current = _category;
  };
  const [debouncePreload] = useDebounce(_preload);

  const changeCategory = useCallback(
    (_cat) => {
      category.current = _cat;
      setList(preloadingCat.current !== _cat ? null : productList);
      if (preloadingCat.current !== _cat) debouncePreload(_cat);
    },
    [productList, setList, debouncePreload]
  );

  useEffect(() => {
    if (!category.current) changeCategory(paramCat);
    if (productList.success && category.current === preloadingCat.current)
      setList(productList);
  }, [productList, setList, preloadingCat, category, paramCat, changeCategory]);

  return (
    <>
      <SubNavCategories
        first={NAV.DEAL}
        category={category.current}
        changeCategory={changeCategory}
        onPreload={(_cat) => (list ? debouncePreload(_cat) : null)}
      />

      <div className={`deal-screen ${banner.current}`}>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={!shadowOf}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          centerMode={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['mobile']}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {(list?.products || dummyMovies).map((product, id) => (
            <Suspense fallback={loadingFallback} key={id}>
              <ProductCard hasDeal product={product} />
            </Suspense>
          ))}
        </Carousel>

        <MessageBox show={list?.products?.length < 1}>
          No Deals On This Category!
        </MessageBox>

        <h2 className="screen__title">Top Deals</h2>

        <div className="screen__featured">
          <SearchBanner info={list}>
            <SortFilter
              order={order}
              getUrl={({ order: _o }) =>
                `/deal/category/all/order/${_o}/pageNumber/1`
              }
            />
          </SearchBanner>

          <div className="row center">
            {list?.products?.map((product, id) => (
              <Suspense key={id} fallback={loadingFallback}>
                <ProductCard hasDeal product={product} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const DealScreen = React.memo(_DealScreen);
export default DealScreen;
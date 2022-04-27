import { AddMyFoodIngredients } from './AddMyFoodIngredients';
import { AddNeedsIngredients } from './AddNeedsIngredients';
import './FoodModal.scss';

export const FoodModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {props.header === '식재료 등록' ? <AddMyFoodIngredients /> : <AddNeedsIngredients />}
          </main>
          <footer>
            <button className="apply">등록</button>
            <button className="close" onClick={close}>
              취소
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

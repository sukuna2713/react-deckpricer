import React, { DetailsHTMLAttributes } from 'react';
import './App.css';

type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
}

type FeeClassification = {
  name: string;
  description: string;
  unitPrice: number;
  numOfPeople: number;
  totalPrice: number;
}

type DetailProps = {
  classification: FeeClassification;
}

type DetailState = {
  numOfPeople: number;
}

class Detail extends React.Component<DetailProps,DetailState> {
  constructor(props: DetailProps) {
    super(props);
    this.state = {
      numOfPeople: props.classification.numOfPeople
    }
  }

  onNumOfPeopleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const num: number = Number(e.target.value);
    this.setState({
      numOfPeople: num
    });
  }

  render() {
    return (
      <div >
        <div className="classification-name">{this.props.classification.name}</div>
        <div className="description">{this.props.classification.description}</div>
        <div className="unit-price">{this.props.classification.unitPrice}円</div>
        <div className="num-people">
          <select value={this.state.numOfPeople}
          onChange={e => this.onNumOfPeopleChange(e)}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <span>名</span>
        </div>
      </div>
    );
  }
}

class Summary extends React.Component {
  render() {
    return (
      <div>
        <div className="party">
          <input type="text" className="party" value="0" />
          <span>名様</span>
        </div>
        <div className="total-amount">
          <span>合計</span>
          <input type="text" className="total-amount" value="0" />
          <span>円</span>
        </div>
      </div>
    );
  }
}

class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
  constructor(props: {}) {
    super(props);
    const adults: FeeClassification = {
      name: "大人",
      description: "",
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const students: FeeClassification = {
      name: "学生",
      description: "中学生・高校生",
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const children: FeeClassification = {
      name: "子ども",
      description: "小学生",
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const infants: FeeClassification = {
      name: "幼児",
      description: "未就学",
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0,
    };
    this.state = { feeClassifications: [adults, students, children, infants] };
  }

  handleNumOfPeopleChange(idx: number, num: number) {
    const currentFC = this.state.feeClassifications[idx];
    const newTotalPrice = currentFC.unitPrice * num;
    //変更しない部分のコピー
    const newFC: FeeClassification = 
      Object.assign({}, currentFC, { numOfPeople: num, totalPrice: newTotalPrice });
    // 新たな配列を生成
    const feeClassifications = this.state.feeClassifications.slice();
    feeClassifications[idx] = newFC;

    // stateの更新
    this.setState({ feeClassifications: feeClassifications });
  }

  render() {
    //TO DO show https://qiita.com/yonetty/items/012be4c5c6258a609e35#appendix-%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97
    const details = this.state.feeClassifications.map((fc,idx) => {
      return (
        <Detail key={idx.toString()} classification={fc}
        onNumOfPeopleChange={n => this.handleNumOfPeopleChange(idx,n)} />
      );
    });

    return (
      <>
        {details}
        <Summary />
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
}

export default App;
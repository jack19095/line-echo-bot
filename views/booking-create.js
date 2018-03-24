import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component {
  render () {
    let operation;
    if (this.props.isTitle) {
      let id = `add${this.props.quality}Product`;
      operation =
      <div className="field">
        <div id={id} className="ui button">
          <i className="add icon"></i>
        </div>
      </div>;
    } else {
      let id = `remove${this.props.quality}Product`;
      operation =
      <div className="field">
        <div id={id} className="ui button">
          <i className="remove icon"></i>
        </div>
      </div>;
    }
    return (
      <div className="ui form">
        <div className="inline fields">
          <div className="two wide field">
            {this.props.isTitle ? <label>{this.props.title}</label> : ''}
          </div>
          <div className="field">
            <select className="ui fluid search dropdown" name="productIds">
              {
                this.props.products.map((item, index) => {
                  return <option value={item.pdId} key={index}>{item.name}</option>;
                })
              }
            </select>
          </div>
          <div className="field">
            <select className="ui fluid search dropdown" name="productAmounts">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
            </select>
          </div>
          {operation}
        </div>
      </div>
    );
  }
}

Product.defaultProps = {
  isTitle: true,
  title: '產品名稱',
  products: [],
  quality: '未知',
};

Product.propTypes = {
  isTitle: PropTypes.bool,
  title: PropTypes.string,
  products: PropTypes.array,
  quality: PropTypes.string,
};

class BookingCreate extends React.Component {
  componentDidMount () {
    $('.ui.form').form({
      fields: {
        closeDate: {
          identifier: 'phone',
          rules: [{
            type: 'empty',
            prompt: '請選擇結案日期'
          }]
        },
        warranty: {
          identifier: 'warranty',
          rules: [{
            type: 'number',
            prompt: '請輸入數字'
          }]
        },
      }
    });
    $('#datePicker').calendar(
      { type: 'date' }
    );
  }

  render () {
    return <div>
      <div className="ui container">
        <h3 id="title">
          申請報備資料填寫頁面
        </h3>

        <table className="ui unstackable very basic small table">
          <tbody>
            <tr>
              <td className="collapsing"> 申請編號：B106390088-N088V</td>
              <td>申請日期：{this.props.currentDate}</td>
            </tr>
            <tr>
              <td>經銷商：{this.props.user.company.name}</td>
              <td>業務：{this.props.user.name}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ui section divider"></div>

      <div className="ui container">
        <form className="ui form" method="post" action="/booking/create">
          <input type="hidden" name="userId" value={this.props.user.ObjectId} />
          <input type="hidden" name="lineId" value={this.props.user.ObjectId} />
          <div className="inline fields">
            <div className="two wide field">
              <label>產品</label>
            </div>
            <div className="field">
              <input name="productCategory" placeholder={this.props.productCategory}
                value={this.props.productCategory} readOnly="" tabIndex="-1" />
            </div>
          </div>
          <div className="inline fields">
            <div className="two wide field">
              <label>預計結案日</label>
            </div>
            <div className="four wide field">
              <div className="ui calendar" id="datePicker">
                <div className="ui input left icon">
                  <i className="calendar icon"></i>
                  <input type="text" placeholder="Date/Time" name="closeDate" id="closeDate" />
                </div>
              </div>

            </div>
          </div>
          <Product products={this.props.mainProducts} isTitle={true}
            title="主系列規格及數量" quality="Main"/>
          <Product products={this.props.minorProducts} isTitle={true}
            title="配件列規格及數量" quality="Minor"/>
          <div className="inline fields">
            <div className="two wide field">
              <label>保固期間（年）</label>
            </div>
            <div className="field">
              <select className="ui fluid search dropdown" name="renewal">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <button className="ui primary button" type="submit">確認</button>
          <button className="ui clear button">清除重填</button>
          <div className="ui error message"></div>
        </form>
      </div>
    </div>;
  }
}

BookingCreate.defaultProps = {
  currentDate: new Date().toString(),
  user: {
    name: '未設定姓名',
    company: {
      name: '未設定公司名稱',
    },
  },
  productCategory: '未設定產品類別',
  mainProducts: [],
  minorProducts: [],
};

BookingCreate.propTypes = {
  productCategory: PropTypes.string,
  currentDate: PropTypes.string,
  user: PropTypes.object,
  mainProducts: PropTypes.array,
  minorProducts: PropTypes.array,
};

export default BookingCreate;

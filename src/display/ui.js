import {Button, Card, Icon, Image, Statistic} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/lottery.jpg' wrapped ui={false}/>

        <Card.Content>
            <Card.Header>福利彩票（海口站）</Card.Header>
            <Card.Meta>
                <p>管理员地址：{props.manager}</p>
                <p>当前地址：{props.currentAccount}</p>
                <p>上期中奖地址：{props.winner}</p>
            </Card.Meta>
            <Card.Description>
                每晚八点准时开奖，不见不散！
            </Card.Description>
        </Card.Content>

        <Card.Content extra>
            <a>
                <Icon name='user'/>
                {props.playersCount}人参与
            </a>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='orange'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href={'https://ropsten.etherscan.io/address/' + props.address}>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>

        <Button animated='fade' color='orange' onClick={props.play} disabled={props.isClicked}>
            <Button.Content visible>投注</Button.Content>
            <Button.Content hidden>购买就有希望</Button.Content>
        </Button>

        <Button color='red' style={{display: props.showButton}} onClick={props.runLottery} disabled={props.isClicked}>
            开奖
        </Button>

        <Button color='grey' style={{display: props.showButton}} onClick={props.refund} disabled={props.isClicked}>
            退奖
        </Button>
    </Card>
)

export default CardExampleCard
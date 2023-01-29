import React from 'react';
import { useSelector } from 'react-redux'
import FeatureItem from '../../components/FeatureItem/FeatureItem'
import chatIcon from '../../assets/icones/icon-chat.png';
import moneyIcon from '../../assets/icones/icon-money.png';
import securityIcon from '../../assets/icones/icon-security.png';
import './Home.css'

const Home = ({tokenExists}) => {

    // const test = useSelector(state => console.log(state))
    console.log(tokenExists)

    return (
        <div>
            <main>
                <div className="hero">
                    <section className="hero-content">
                        <h2 className="sr-only">Promoted Content</h2>
                        <p className="subtitle">No fees.</p>
                        <p className="subtitle">No minimum deposit.</p>
                        <p className="subtitle">High interest rates.</p>
                        <p className="text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    <FeatureItem  icon={chatIcon} title={"You are our #1 priority"} content={"Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."}/>
                    <FeatureItem  icon={moneyIcon} title={"More savings means higher rates"} content={"The more you save with us, the higher your interest rate will be!"}/>
                    <FeatureItem  icon={securityIcon} title={"Security you can trust"} content={"We use top of the line encryption to make sure your data and money is always safe."}/>
                </section>
            </main>
        </div>
    );
};

export default Home;
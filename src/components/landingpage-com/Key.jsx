import React from 'react'
import "./key.scss";

function Key() {
  return (
    <div>
        <div className="key-container">
            <div className="key-header-text">
                <h1>Key Features and Functionalities</h1>
            </div>
            <div className="key-wrap">
                <div className="key-box">
                    <h1>Customization and Setup</h1>
                    <hr />
                    <ul>
                        <li><span>Easy Deployment:</span> By following the instructions on the breakaway.community website, setting up a BAC requires minimal coding experience. Tutorials and example videos are available to assist users through the process.</li>
                        <li><span>Additional features:</span> such as colour scheme selection, trending feed customisation and functionality will be built in over time</li>
                        <li><span> UI Customization:</span> Users can have their own domain URL and design their frontend according to their preferences.</li>
                    </ul>
                </div>
                <div className="key-box">
                    <h1>Integration with Other Web3 Communities</h1>
                    <hr />
                    <ul>
                        <li><span>Cross-Platform Compatibility:</span> Breakaway communities facilitate the integration of other web3 communities into Hive, allowing them to have their own sites and reward systems where only their own community members can post to the site.</li>
                        <li><span>NFT and Bitcoin Integration:</span> An example of this is that users with Bitcoin ordinals will be able to create their own communities and log in using their NFTs and Bitcoin Wallets and exclusively post to their own dedicated community platform.</li>
                    </ul>
                </div>
                <div className="key-box ">
                    <h1>Types of Breakaway Communities</h1>
                    <hr />
                    <ul>
                        <li><span>Community-specific:</span> Focused on a particular Hive community.</li>
                        <li><span>Author-specific:</span> Dedicated to content from a specific author or authors (under development, to follow).</li>
                        <li><span>Tag-specific:</span> Centered around specific tags or topics (under development, to follow).
                        </li>
                    </ul>
                </div>
                
            </div>
            <div className="key-box-sec-wrap">
                <div className="key-box key-box-2 ">
                    <h1>Point System and Tokens</h1>
                    <hr />
                    <ul>
                        <li><span>Earning Points:</span> Community members can earn points through various actions such as logging in, commenting, posting, reblogging, and upvoting content.</li>
                        <li><span>Tokenization:</span> The tokens will be general Proof of Brain (Incentivised stakeholder distribution) tokens, however a portion of the inflation will go to social users who show strong activity on the platforms based on how many points they have claimed from actions such as logging in, commenting, posting and sharing.  This is in addition to what they rewards based on community stake weighted upvotes on their social content.</li>
                    </ul>
                </div>
                <div className="key-box key-box-2 ">
                    <h1>Advantage of Free, Open Source</h1>
                    <hr />
                    <ul>
                    <li><span>Community-Funded Open Source Model:</span> Breakaway communities operate as an open-source frontend, supported and funded by the community. This collaborative model ensures continuous development and innovation driven by the collective efforts of its users.</li>
                    <li><span>Seamless Integration with Ecency Updates:</span> Breakaway communities benefit from the latest updates to the Ecency platform, a tokenized, open-source web3 platform funded by the Hive DAO. This means that any improvements or new features introduced to Ecency are automatically available to breakaway communities, ensuring they remain up-to-date with the latest technological advancements.</li>
                    </ul>
                </div>
            </div>
            
        </div> 

    </div>
    
  )
}

export default Key
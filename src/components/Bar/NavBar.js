import React from 'react';

function NavBar (props) {
    const {onInsideNavBar, onOutsideNavBar, onSelect} = props;
    const tabHeading = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'HufflePuff']
    const display = [];
    for (let i = 0; i < tabHeading.length; i++) {
        const index = i;
        display.push(
            <li 
                onMouseEnter={onSelect.bind(null,index)}
                key={i}
                className='navigation-li'
            >
                {tabHeading[i]}
            </li>
        )
    }
    return (
        <div
            onMouseEnter={onInsideNavBar} 
            onMouseLeave={onOutsideNavBar}
        >
            <ul className='navigation-navBar navigation-ul'>
                {display}
            </ul>
        </div>
    )
}
    
export default NavBar;
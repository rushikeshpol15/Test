let intialState=[];

function setUserTickets(state=intialState,Action)
{
    if(Action.type=='SET USER TICKETS')
    {
        return Action.value;
    }
    else{
        return state;
    }
}

export {setUserTickets};
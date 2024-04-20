let initialData=[];

function setData(state=initialData,Action)
{
    if(Action.type=='SET DATA')
    {
        return Action.value;
    }
    else{
        return state
    }
}

export {setData};
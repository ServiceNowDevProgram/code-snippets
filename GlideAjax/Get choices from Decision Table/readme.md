> [!IMPORTANT]
> Create a Decision table with a result column of type '**Choice**'!
> If you created the choices inside the Decision Table, make sure the values are noo long. They end up getting truncated in the sys_decision_answer table, and sebsequently the values stored in sys_choice will not much. So if necessary, change the default value to something short and unique, or use an existing choice list from sys_choice.


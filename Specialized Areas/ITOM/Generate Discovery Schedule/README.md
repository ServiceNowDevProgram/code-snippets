This script will help in generating a discovery schedule with the list of IP addresses mentioned in the ip_list variable and then starting the discovery.

It has some properties present in it like:
    -> discover.<region>.cluster => SYS ID of the regional cluster made
    -> discover.mid_user => JSON object of mid_user accounts based on region similar to midCluster.
        Ex:
            {
                "europe":"<sys_id_of_mid_user_of_the_europe_cluster>",
                "las_vegas":"<sys_id_of_mid_user_of_the_las_vegas_cluster>",
            }, etc.

| schemaname | tablename | policyname                                    | permissive | roles           | cmd    | using_expression                                                                                                          | with_check_expression                                                                                                     |
| ---------- | --------- | --------------------------------------------- | ---------- | --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| public     | bar       | Enable delete access for users based on owner | PERMISSIVE | {authenticated} | DELETE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = bar.owner) AND (profiles.id = ( SELECT auth.uid() AS uid))))) | null                                                                                                                      |
| public     | bar       | Enable insert access for users based on owner | PERMISSIVE | {authenticated} | INSERT | null                                                                                                                      | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = bar.owner) AND (profiles.id = ( SELECT auth.uid() AS uid))))) |
| public     | bar       | Enable select access for users based on owner | PERMISSIVE | {authenticated} | SELECT | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = bar.owner) AND (profiles.id = ( SELECT auth.uid() AS uid))))) | null                                                                                                                      |
| public     | bar       | Enable update access for users based on owner | PERMISSIVE | {authenticated} | UPDATE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = bar.owner) AND (profiles.id = ( SELECT auth.uid() AS uid))))) | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = bar.owner) AND (profiles.id = ( SELECT auth.uid() AS uid))))) |
| public     | beer      | beer_select_global_or_own_or_admin            | PERMISSIVE | {public}        | SELECT | ((is_global = true) OR (author = auth.uid()) OR is_admin())                                                               | null                                                                                                                      |
| public     | profiles  | profiles_admin_select_all                     | PERMISSIVE | {authenticated} | SELECT | is_admin()                                                                                                                | null                                                                                                                      |
| public     | profiles  | profiles_select_own                           | PERMISSIVE | {public}        | SELECT | (auth.uid() = id)                                                                                                         | null                                                                                                                      |
| public     | profiles  | profiles_update_own                           | PERMISSIVE | {public}        | UPDATE | (auth.uid() = id)                                                                                                         | ((auth.uid() = id) AND (is_admin = false))                                                                                |
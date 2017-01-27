insert into users (displayname, googleid)
  values($1, $2)
  returning (displayname, googleid)

insert into users (displayname, facebookid)
  values($1, $2)
  returning (displayname, facebookid)

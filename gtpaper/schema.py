import graphene

from gtpaper.models import User


class UserQL(graphene.ObjectType):
    class Meta:
        model = User


class Query(graphene.ObjectType):
    users = graphene.List(UserQL)

    def resolve_users(self):
        return User.objects.all()


class Mutation(graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)

var expect = require('chai').expect,
    members = require('../members');

describe('Member', function () {
  describe('#validateMember', function () {
    it('1 validateMember() should return true if email and password correct', function () {
      // mock input data
      var email = 'admin@email.com';
      var password = 'password';
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      expect(members.validateMember(email, password)).to.equal(true);
    });

    it('2 validateMember() should return false if email and password are empty', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      expect(members.validateMember('', '')).to.equal(false);
    });

    it('3 validateMember() should return false if email is empty', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      expect(members.validateMember('', 'password')).to.equal(false);
    });

    it('4 validateMember() should return false if password is empty', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      expect(members.validateMember('admin@email.com', '')).to.equal(false);
    });

    it('5 validateMember() should return false if email is incorrect', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      expect(members.validateMember('admin1@email.com', 'password')).to.equal(false);
    });

    it('6 validateMember() should return false if password is incorrect', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      expect(members.validateMember('admin@email.com', 'password1')).to.equal(false);
    });

    it('7 validateMember() should return false if email and password are incorrect', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      expect(members.validateMember('admin1@email.com', 'password1')).to.equal(false);
    });
  });

  describe('#findMembersByEmail', function () {
    it('1 findMembersByEmail() should return member if there is member that has that email', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      var foundMember = members.findMembersByEmail("admin@email.com");
      expect(foundMember.email).to.equal('admin@email.com');
      expect(foundMember.password).to.equal('password');
    });

    it('2 findMembersByEmail() should return null if there is no member that has that email', function () {
      // mock member data
      members.memberList = [{email: 'admin@email.com', password: 'password'}];
      var foundMember = members.findMembersByEmail('admin1@email.com');
      expect(foundMember).to.equal(null);
    });
  });
});
